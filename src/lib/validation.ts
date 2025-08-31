import { z } from "zod";

// Regex para telefone brasileiro com DDD
const phoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;

// Schema base para participante
const participanteSchema = z.object({
  nome: z
    .string()
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(100, "Nome deve ter no máximo 100 caracteres"),

  email: z
    .string()
    .email("E-mail inválido")
    .max(100, "E-mail deve ter no máximo 100 caracteres"),

  telefone: z
    .string()
    .regex(phoneRegex, "Telefone deve estar no formato (11) 91234-5678"),

  nascimento: z
    .string()
    .min(1, "Data de nascimento é obrigatória")
    .refine((date) => {
      const parsed = new Date(date);
      const now = new Date();
      let age = now.getFullYear() - parsed.getFullYear();
      const monthDiff = now.getMonth() - parsed.getMonth();
      if (
        monthDiff < 0 ||
        (monthDiff === 0 && now.getDate() < parsed.getDate())
      ) {
        age--;
      }
      if (age < 11) return false;
      return age >= 11 && age <= 80;
    }, "Inscrições apenas a partir de 11 anos"),

  menor: z.boolean(),
});

// Schema condicional para responsável
const responsavelSchema = z
  .object({
    responsavelNome: z.string().min(2, "Nome do responsável é obrigatório"),

    responsavelTelefone: z
      .string()
      .regex(phoneRegex, "Telefone deve estar no formato (11) 91234-5678"),

    autorizacao: z
      .boolean()
      .refine((val) => val === true, "Autorização é obrigatória"),
  })
  .optional();

// Schema para demais dados
const dadosSchema = z.object({
  tamanho: z.string().min(1, "Tamanho da camiseta é obrigatório"),

  formaPagamento: z.string().min(1, "Forma de pagamento é obrigatória"),

  valor: z
    .number()
    .min(250, "Valor deve ser R$ 250,00")
    .max(250, "Valor deve ser R$ 250,00"),

  parcelas: z.string().optional(),

  observacoes: z
    .string()
    .max(500, "Observações devem ter no máximo 500 caracteres")
    .optional(),
});

// Schema principal com validação condicional
export const formSchema = z
  .object({
    ...participanteSchema.shape,
    ...dadosSchema.shape,
    responsavelNome: z.string().optional(),
    responsavelTelefone: z.string().optional(),
    autorizacao: z.boolean().optional(),
  })
  .refine(
    (data) => {
      // Se for menor de idade, campos do responsável são obrigatórios
      if (data.menor) {
        return !!(
          data.responsavelNome &&
          data.responsavelTelefone &&
          data.autorizacao === true
        );
      }
      return true;
    },
    {
      message: "Dados do responsável são obrigatórios para menores de 18 anos",
      path: ["responsavelNome"],
    }
  );

export type FormData = z.infer<typeof formSchema>;

// Validação por step
export const validateStep = (step: string, data: Partial<FormData>) => {
  switch (step) {
    case "participante":
      return participanteSchema.safeParse(data);

    case "responsavel":
      if (!data.menor) return { success: true };
      const responsavelRequired = z.object({
        responsavelNome: z.string().min(2, "Nome do responsável é obrigatório"),
        responsavelTelefone: z.string().regex(phoneRegex, "Telefone inválido"),
        autorizacao: z
          .boolean()
          .refine((val) => val === true, "Autorização é obrigatória"),
      });
      return responsavelRequired.safeParse({
        responsavelNome: data.responsavelNome,
        responsavelTelefone: data.responsavelTelefone,
        autorizacao: data.autorizacao,
      });

    case "tamanho":
      return z.object({ tamanho: z.string().min(1) }).safeParse(data);

    case "pagamento":
      return z
        .object({
          formaPagamento: z.string().min(1),
          valor: z.number().min(1),
        })
        .safeParse(data);

    default:
      return { success: true };
  }
};
