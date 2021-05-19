CREATE SEQUENCE public.disciplina_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;
    
CREATE TABLE public.disciplina
(
    id integer NOT NULL DEFAULT nextval('disciplina_id_seq'::regclass),
    descricao character varying(255) COLLATE pg_catalog."default",
    nome character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT disciplina_pkey PRIMARY KEY (id)
)