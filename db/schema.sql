DROP TABLE IF EXISTS sample CASCADE;
DROP TABLE IF EXISTS samples CASCADE;

CREATE TABLE sample (
    id uuid primary key default uuid_generate_v4(),
    at BIGINT,        
    at_from BIGINT,
    at_to BIGINT,
    value numeric(16,4),
    value_min numeric(16,4),
    value_max numeric(16,4)
);

CREATE INDEX idx_sample_at ON sample (at);
CREATE INDEX idx_sample_value ON sample (value);

CREATE TABLE samples (
    sample_id uuid,
    at BIGINT,
    value numeric(16,4)
);

CREATE INDEX idx_samples_id ON samples (sample_id);
CREATE INDEX idx_samples_at ON samples (at);
