export const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";
export const localCloudName = process.env.NEXT_PUBLIC_CLOUD_NAME ?? "";
export const localPresetKey = process.env.NEXT_PUBLIC_PRESET_KEY ?? "";
export const WEB_URL = process.env.NEXT_PUBLIC_WEB_URL ?? "";

export const ONE_HOUR_SECONDS = 60 * 60;
export const ONE_DAY_SECONDS = 60 * 60 * 24;
export const ONE_MONTH_SECONDS = 60 * 60 * 24 * 30;

export const WEBSITE_DETAILS = {
  title: "Obalende Enugu",
  address: "24 Nza street,behind Government House, Independence Layout Enugu",
  phoneNumber: "08036369841",
  whatsappN0: "09075006006",
  email: "karoke.legends@gmail.com",
};

export enum EventStatus {
  ongoing = "ONGOING",
  upcoming = "UPCOMING",
  closed = "CLOSED",
  deleted = "DELETED",
  cancelled = "CANCELLED",
}

export const ACCOUNT_DETAILS = {
    name: "Obalende Foods Limited ",
    bank: "Fidelity Bank PLC",
    accountNumber: "5020135858",
}
