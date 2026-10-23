import { DeliveryOption } from "@/types/cart";

export const DELIVERY_OPTIONS: DeliveryOption[] = [
  {
    id: "addis-ababa",
    name: "Addis Ababa White-Glove Courier",
    description: "Complimentary same-day or next-day luxury doorstep delivery within Addis Ababa",
    feeETB: 0,
    estimatedDays: "1–2 business days",
  },
  {
    id: "ethiopia-regions",
    name: "Ethiopian Regional Express",
    description: "Secure delivery to Bahir Dar, Hawassa, Mekelle, Gondar, Dire Dawa, Adama & more",
    feeETB: 450,
    estimatedDays: "2–4 business days",
  },
  {
    id: "international",
    name: "Global Diaspora Priority (DHL Express)",
    description: "International tracked courier to USA, Canada, Europe, Middle East & worldwide",
    feeETB: 3500,
    estimatedDays: "4–7 business days",
  },
];

export const ADDIS_SUB_CITIES = [
  "Bole (ቦሌ)",
  "Kirkos / Kazanchis (ቂርቆስ / ካዛንቺስ)",
  "Yeka / CMC / Ayat (የካ / ሲኤምሲ / አያት)",
  "Lideta / Mexico (ልደታ / ሜክሲኮ)",
  "Nifas Silk-Lafto / Sarbet / Lebu (ንፋስ ስልክ ላፍቶ / ሳርቤት)",
  "Arada / Piassa (አራዳ / ፒያሳ)",
  "Gullele / Shiro Meda (ጉለሌ / ሽሮ ሜዳ)",
  "Kolfe Keranio (ኮልፌ ቀራኒዮ)",
  "Akaky Kaliti (አቃቂ ቃሊቲ)",
  "Bole Bulbula / Goro (ቦሌ ቡልቡላ / ጎሮ)",
  "Old Airport / Bisrate Gabriel (ኦልድ ኤርፖርት / ብስራተ ገብርኤል)",
];

export const REGIONAL_CITIES = [
  "Bahir Dar (ባሕር ዳር)",
  "Hawassa (ሀዋሳ)",
  "Gondar (ጎንደር)",
  "Mekelle (መቀሌ)",
  "Dire Dawa (ድሬዳዋ)",
  "Adama / Nazret (አዳማ / ናዝሬት)",
  "Jimma (ጅማ)",
  "Bishoftu / Debre Zeyit (ቢሾፍቱ)",
  "Harar (ሐረር)",
  "Dessie (ደሴ)",
  "Arba Minch (አርባ ምንጭ)",
];
