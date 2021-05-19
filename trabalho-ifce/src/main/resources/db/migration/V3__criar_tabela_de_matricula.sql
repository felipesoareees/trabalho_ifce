CREATE SEQUENCE public.matricula_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;
    
CREATE TABLE public.matricula
(
    id integer NOT NULL DEFAULT nextval('matricula_id_seq'::regclass),
    aluno_id integer,
    disciplina_id integer,
    CONSTRAINT matricula_pkey PRIMARY KEY (id),
    CONSTRAINT fk9q3agcy53y27hpojb8c9xyjc1 FOREIGN KEY (disciplina_id)
        REFERENCES public.disciplina (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fksmkrefmwkwfyod36k45jf1rr5 FOREIGN KEY (aluno_id)
        REFERENCES public.aluno (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)