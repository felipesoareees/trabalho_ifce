CREATE SEQUENCE public.aluno_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;
    
CREATE TABLE public.aluno
(
    id integer NOT NULL DEFAULT nextval('aluno_id_seq'::regclass),
    cpf character varying(255) COLLATE pg_catalog."default",
    email character varying(255) COLLATE pg_catalog."default",
    nome character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT aluno_pkey PRIMARY KEY (id)
)