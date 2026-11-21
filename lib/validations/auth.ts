import { z } from "zod";

// Liste des mots de passe les plus courants à bloquer
const WEAK_PASSWORDS = [
  "123456", "123456789", "qwerty", "password", "12345", "12345678",
  "111111", "1234567", "sunshine", "qwerty123", "admin", "letmein",
  "welcome", "monkey", "dragon", "master", "abc123", "iloveyou"
];

const passwordValidation = z.string()
  .min(8, "Le mot de passe doit contenir au moins 8 caractères")
  .max(128, "Le mot de passe ne peut pas dépasser 128 caractères") // Règle 3 : pas de max trop court
  .regex(/[A-Z]/, "Il doit contenir au moins une majuscule")
  .regex(/[a-z]/, "Il doit contenir au moins une minuscule")
  .regex(/[0-9]/, "Il doit contenir au moins un chiffre")
  .regex(/[^A-Za-z0-9]/, "Il doit contenir au moins un caractère spécial") // Règle 3 : autorise les spéciaux
  .refine((pwd) => !WEAK_PASSWORDS.includes(pwd.toLowerCase()), {
    message: "Ce mot de passe est trop courant. Choisissez-en un plus sûr."
  });

export const loginSchema = z.object({
  email: z.string().email("Adresse email invalide"),
  password: z.string().min(1, "Le mot de passe est requis"),
});

export const registerSchema = z.object({
  fullName: z.string().min(2, "Le nom complet est requis"),
  email: z.string().email("Adresse email invalide"),
  phone: z.string().min(8, "Le numéro de téléphone est requis"),
  businessName: z.string().min(2, "Le nom du commerce est requis"),
  businessType: z.string().min(1, "Le type est requis"),
  city: z.string().min(1, "La ville est requise"),
  password: passwordValidation,
});