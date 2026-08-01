export const companyContact = {
  legalName: "Mind Matrix Intelligent Solutions",
  shortName: "Mind Matrix",
  address: {
    line1: "181, Near Signature Tower, Sani Khera",
    city: "Gurugram",
    state: "Haryana",
    stateCode: "06",
  },
  gstin: "06BMCP5140JA123",
  email: "info@mmisindia.com",
} as const;

export function formatCompanyAddress(multiline = false): string {
  const { line1, city, state } = companyContact.address;
  if (multiline) {
    return `${line1}\n${city}, ${state}`;
  }
  return `${line1}, ${city}, ${state}`;
}

export function formatGstinLabel(): string {
  const { gstin, address } = companyContact;
  return `GSTIN: ${gstin} · State: ${address.state}, Code: ${address.stateCode}`;
}
