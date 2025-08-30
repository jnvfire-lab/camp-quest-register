// Configurações do evento
export const EVENT_CONFIG = {
  title: "Fire Camp 2025",
  subtitle:
    "Dias para queimar por Jesus, crescer em unidade e viver algo novo.",
  location:
    "Rua Jabuticabeira, 385, Jaguariúna — Recanto Ebenézer — Manancial de Bençãos",
  ageLimit: "A partir de 11 anos",
  paymentDeadline: "12/10/2025",
  dateEvent: "Dia 17, 18 e 19 de Outubro de 2025"
};

// Opções para seleções
export const TAMANHOS_CAMISETA = [
  { value: "12", label: "12 anos" },
  { value: "14", label: "14 anos" },
  { value: "16", label: "16 anos" },
  { value: "PP", label: "PP" },
  { value: "P", label: "P" },
  { value: "M", label: "M" },
  { value: "G", label: "G" },
  { value: "GG", label: "GG" },
  { value: "XG", label: "XG" },
];

export const FORMAS_PAGAMENTO = [
  { value: "pix", label: "Pix" },
  { value: "cartao", label: "Cartão — falar com organização" },
  { value: "dinheiro", label: "Dinheiro no dia" },
];

export const OPCOES_PARCELAS = [
  { value: "1x", label: "1x (à vista)" },
  { value: "2x", label: "2x" },
  { value: "3x", label: "3x" },
  { value: "4x", label: "4x" },
  { value: "5x", label: "5x" },
  { value: "6x", label: "6x" },
  { value: "7x", label: "7x" },
  { value: "8x", label: "8x" },
  { value: "9x", label: "9x" },
  { value: "10x", label: "10x" },
];

// Configuração dos steps
export const FORM_STEPS = [
  {
    id: "participante",
    title: "Dados do Participante",
    description: "Informações básicas para inscrição",
  },
  {
    id: "responsavel",
    title: "Dados do Responsável",
    description: "Obrigatório para menores de 18 anos",
  },
  {
    id: "tamanho",
    title: "Tamanho da Camiseta",
    description: "Escolha o tamanho ideal",
  },
  {
    id: "pagamento",
    title: "Pagamento",
    description: "Forma e detalhes do pagamento",
  },
  {
    id: "observacoes",
    title: "Observações",
    description: "Restrições alimentares e informações extras",
  },
];

// Máscara para telefone brasileiro
export const PHONE_MASK = "(99) 99999-9999";

// Contatos WhatsApp Fire Camp 2025
export const WHATSAPP_CONTACTS = {
  maicon: "5519992467395",
  gabi: "5519986046866",
};

// Dados PIX Fire Camp 2025
export const PIX_DATA = {
  key: "jnvfire@gmail.com",
  name: "Maicon Romano",
  bank: "Will",
};

// Valor do evento
export const EVENT_VALUE = 250;

// Versículos
export const BIBLE_VERSES = [
  {
    reference: "1Tm 4:12",
    text: "Ninguém o despreze por você ser jovem…",
  },
  {
    reference: "Sl 133:1",
    text: "Oh! Como é bom e agradável viverem unidos os irmãos!",
  },
];
