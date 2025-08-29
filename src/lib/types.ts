export type Submission = {
  // Dados do participante
  nome: string;
  email: string;
  telefone: string;
  nascimento: string;
  menor: boolean;
  
  // Responsável (se menor de 18)
  responsavelNome?: string;
  responsavelTelefone?: string;
  autorizacao?: boolean;
  
  // Outros dados
  tamanho: string;
  formaPagamento: string;
  valor: number;
  parcelas?: string;
  comprovante?: File;
  observacoes?: string;
};

export interface DataAdapter {
  save(submission: Submission): Promise<{ ok: boolean }>;
}

export type FormStep = 
  | 'participante'
  | 'responsavel'
  | 'tamanho'
  | 'pagamento'
  | 'observacoes'
  | 'sucesso';

export interface StepConfig {
  title: string;
  description?: string;
  fields: string[];
  optional?: boolean;
}