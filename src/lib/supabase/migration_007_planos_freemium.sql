-- =============================================================
-- Migration: planos, freemium e controle de uso diário
-- Roda no SQL Editor do Supabase
-- =============================================================

-- 1. Adiciona coluna de plano na tabela de perfis
ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS plano TEXT NOT NULL DEFAULT 'free'
    CHECK (plano IN ('free', 'questoes', 'ensino', 'combo'));

-- 2. Tabela de controle de uso diário do freemium
CREATE TABLE IF NOT EXISTS uso_diario (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id             UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  data                DATE NOT NULL DEFAULT CURRENT_DATE,
  questoes_respondidas INT  NOT NULL DEFAULT 0,
  gabaritos_vistos    INT  NOT NULL DEFAULT 0,
  UNIQUE(user_id, data)
);

-- 3. RLS na tabela de uso diário
ALTER TABLE uso_diario ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "usuario ve proprio uso"      ON uso_diario;
DROP POLICY IF EXISTS "usuario atualiza proprio uso" ON uso_diario;

CREATE POLICY "usuario ve proprio uso"
  ON uso_diario FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "usuario atualiza proprio uso"
  ON uso_diario FOR ALL
  USING (auth.uid() = user_id);

-- 4. Função para incrementar uso diário de questões
CREATE OR REPLACE FUNCTION incrementar_uso_questao(p_user_id UUID)
RETURNS TABLE(questoes_respondidas INT, gabaritos_vistos INT)
LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  INSERT INTO uso_diario(user_id, data, questoes_respondidas, gabaritos_vistos)
    VALUES (p_user_id, CURRENT_DATE, 1, 0)
  ON CONFLICT (user_id, data)
    DO UPDATE SET questoes_respondidas = uso_diario.questoes_respondidas + 1;

  RETURN QUERY
    SELECT ud.questoes_respondidas, ud.gabaritos_vistos
    FROM uso_diario ud
    WHERE ud.user_id = p_user_id AND ud.data = CURRENT_DATE;
END;
$$;

-- 5. Função para registrar visualização de gabarito comentado
CREATE OR REPLACE FUNCTION registrar_gabarito_visto(p_user_id UUID)
RETURNS INT
LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
  total INT;
BEGIN
  INSERT INTO uso_diario(user_id, data, questoes_respondidas, gabaritos_vistos)
    VALUES (p_user_id, CURRENT_DATE, 0, 1)
  ON CONFLICT (user_id, data)
    DO UPDATE SET gabaritos_vistos = uso_diario.gabaritos_vistos + 1;

  SELECT gabaritos_vistos INTO total
  FROM uso_diario
  WHERE user_id = p_user_id AND data = CURRENT_DATE;

  RETURN total;
END;
$$;

-- 6. View para facilitar a leitura do uso de hoje no client
CREATE OR REPLACE VIEW uso_hoje AS
  SELECT
    user_id,
    questoes_respondidas,
    gabaritos_vistos
  FROM uso_diario
  WHERE data = CURRENT_DATE;

-- =============================================================
-- Pronto! Confirme que não houve erros antes de fazer o deploy.
-- =============================================================
