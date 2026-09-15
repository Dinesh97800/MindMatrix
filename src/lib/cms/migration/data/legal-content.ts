/** Legal page body content extracted from legacy TermsContentSection / SideNavigationSection. */
export const PRIVACY_POLICY_INTRO =
  "This policy describes how Mind Matrix Intelligent Solutions handles information collected through this website and related enquiry channels.";

export const PRIVACY_POLICY_TOC = [
  { href: "#introduction", label: "Introduction" },
  { href: "#data-collection", label: "Information We Collect" },
  { href: "#usage", label: "How We Use Information" },
  { href: "#sharing", label: "Sharing" },
  { href: "#retention", label: "Retention" },
  { href: "#security", label: "Security" },
  { href: "#rights", label: "Your Rights" },
  { href: "#contact", label: "Contact" },
] as const;

export const PRIVACY_POLICY_SECTIONS = [
  {
    id: "introduction",
    heading: "1. Introduction",
    paragraphs: [
      "Mind Matrix Intelligent Solutions operates this website to provide information about our embedded engineering services and to receive business enquiries. We collect only the information needed to respond to enquiries and operate the website responsibly.",
    ],
  },
  {
    id: "data-collection",
    heading: "2. Information We Collect",
    bullets: [
      "Contact details submitted through enquiry forms, such as name, email, phone, and company.",
      "Technical information you choose to share about a product requirement or project.",
      "Basic website usage information such as pages visited, browser type, and approximate location derived from IP address, if analytics or server logs are enabled.",
      "Cookie or similar technology data if used for basic site functionality or analytics.",
    ],
  },
  {
    id: "usage",
    heading: "3. How We Use Information",
    bullets: [
      "To respond to enquiries and provide requested engineering consultation.",
      "To communicate about proposals, meetings, or project discussions you request.",
      "To maintain, secure, and improve the website.",
      "To comply with applicable legal obligations.",
    ],
  },
  {
    id: "sharing",
    heading: "4. Sharing With Service Providers",
    paragraphs: [
      "We may share information with essential service providers that help us operate the website or process enquiries, such as hosting, email delivery, form processing, or analytics providers. These providers are expected to handle information only for the services they provide to us.",
    ],
  },
  {
    id: "retention",
    heading: "5. Retention",
    paragraphs: [
      "Enquiry information is retained only as long as reasonably necessary to respond to the request, maintain business records, or meet legal requirements. Retention periods may vary depending on the nature of the enquiry and any ongoing commercial discussion.",
    ],
  },
  {
    id: "security",
    heading: "6. Security",
    paragraphs: [
      "We apply reasonable administrative and technical measures to protect information submitted through this website. No online transmission or storage system can be guaranteed to be completely secure.",
    ],
  },
  {
    id: "rights",
    heading: "7. Your Rights",
    paragraphs: [
      "You may request access to, correction of, or deletion of personal information we hold about you, subject to applicable law and legitimate business record requirements. To make a request, contact us using the details below.",
    ],
  },
  {
    id: "contact",
    heading: "8. Contact",
    variant: "featured",
    email: "info@mmisindia.com",
    paragraphs: [
      "For privacy-related requests, contact Mind Matrix Intelligent Solutions at info@mmisindia.com.",
      "181, Near Signature Tower, Saini Khera, Gurugram, Haryana",
      "This website privacy policy should be reviewed against the actual hosting, analytics, email, and form services in use. Project-specific commercial terms remain in proposals and agreements, not in this general website policy.",
    ],
  },
] as const;

export const TERMS_SECTIONS = [
  {
    id: "acceptance",
    heading: "1. Acceptance of Terms",
    paragraphs: [
      "By accessing and using the website of Mind Matrix Intelligent Solutions (MMIS), you agree to these Terms of Website Use. If you do not agree, please do not use this website.",
    ],
  },
  {
    id: "website-use",
    heading: "2. Website Use",
    paragraphs: [
      "This website provides general information about Mind Matrix Intelligent Solutions, its engineering services, and contact options. Content is provided for information purposes and does not constitute a binding offer unless confirmed in a separate written proposal or agreement.",
    ],
  },
  {
    id: "enquiries",
    heading: "3. Enquiries and Submissions",
    paragraphs: [
      "Information submitted through contact or consultation forms may be used to respond to your enquiry. Project confidentiality and customer information are handled in accordance with agreed project requirements. Detailed confidentiality, data handling, and project terms are defined in the applicable proposal or agreement.",
    ],
  },
  {
    id: "intellectual-property",
    heading: "4. Intellectual Property",
    paragraphs: [
      "Website content, branding, and materials published by Mind Matrix Intelligent Solutions remain the property of the company unless otherwise stated. Customer project materials, designs, and deliverables are handled according to the applicable project agreement.",
    ],
  },
  {
    id: "liability",
    heading: "5. Limitation of Liability",
    paragraphs: [
      'To the extent permitted by applicable law, Mind Matrix Intelligent Solutions provides this website on an "as is" basis and does not warrant uninterrupted or error-free operation. The company is not liable for indirect or consequential loss arising from use of this website.',
    ],
  },
  {
    id: "governing-law",
    heading: "6. Governing Law",
    paragraphs: [
      "These terms are governed by the laws of India. Any disputes shall be subject to the jurisdiction of courts in Gurugram, Haryana, unless otherwise agreed in writing.",
    ],
  },
  {
    id: "contact",
    heading: "7. Contact",
    email: "info@mmisindia.com",
    paragraphs: ["For questions about these terms, contact info@mmisindia.com."],
  },
] as const;
