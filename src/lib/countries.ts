export interface CountryInfo {
  code: string;
  flag: string;
  name: string;
}

export const COUNTRIES: Record<string, CountryInfo> = {
  CI: { code: "CI", flag: "🇨🇮", name: "Côte d'Ivoire" },
  KE: { code: "KE", flag: "🇰🇪", name: "Kenya" },
  SN: { code: "SN", flag: "🇸🇳", name: "Sénégal" },
  ML: { code: "ML", flag: "🇲🇱", name: "Mali" },
  BF: { code: "BF", flag: "🇧🇫", name: "Burkina Faso" },
  TG: { code: "TG", flag: "🇹🇬", name: "Togo" },
  BJ: { code: "BJ", flag: "🇧🇯", name: "Bénin" },
  GH: { code: "GH", flag: "🇬🇭", name: "Ghana" },
  NG: { code: "NG", flag: "🇳🇬", name: "Nigeria" },
  CM: { code: "CM", flag: "🇨🇲", name: "Cameroun" },
  GA: { code: "GA", flag: "🇬🇦", name: "Gabon" },
  CD: { code: "CD", flag: "🇨🇩", name: "RD Congo" },
  CG: { code: "CG", flag: "🇨🇬", name: "Congo" },
  RW: { code: "RW", flag: "🇷🇼", name: "Rwanda" },
  TZ: { code: "TZ", flag: "🇹🇿", name: "Tanzanie" },
  UG: { code: "UG", flag: "🇺🇬", name: "Ouganda" },
  ZA: { code: "ZA", flag: "🇿🇦", name: "Afrique du Sud" },
  MA: { code: "MA", flag: "🇲🇦", name: "Maroc" },
  TN: { code: "TN", flag: "🇹🇳", name: "Tunisie" },
  DZ: { code: "DZ", flag: "🇩🇿", name: "Algérie" },
  EG: { code: "EG", flag: "🇪🇬", name: "Égypte" },
  FR: { code: "FR", flag: "🇫🇷", name: "France" },
  BE: { code: "BE", flag: "🇧🇪", name: "Belgique" },
  CH: { code: "CH", flag: "🇨🇭", name: "Suisse" },
  CA: { code: "CA", flag: "🇨🇦", name: "Canada" },
  US: { code: "US", flag: "🇺🇸", name: "États-Unis" },
  UK: { code: "UK", flag: "🇬🇧", name: "Royaume-Uni" },
  AE: { code: "AE", flag: "🇦🇪", name: "Émirats arabes unis" },
  ES: { code: "ES", flag: "🇪🇸", name: "Espagne" },
  GN: { code: "GN", flag: "🇬🇳", name: "Guinée" },
  GW: { code: "GW", flag: "🇬🇼", name: "Guinée-Bissau" },
  NE: { code: "NE", flag: "🇳🇪", name: "Niger" },
  PK: { code: "PK", flag: "🇵🇰", name: "Pakistan" },
  IN: { code: "IN", flag: "🇮🇳", name: "Inde" },
  BD: { code: "BD", flag: "🇧🇩", name: "Bangladesh" },
  TD: { code: "TD", flag: "🇹🇩", name: "Tchad" },
};

export const getCountry = (code: string): CountryInfo | undefined => COUNTRIES[code];
