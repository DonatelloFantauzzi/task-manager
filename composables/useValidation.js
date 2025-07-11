export function useValidation() {
  const validateEmail = (email) => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  };

  const validatePassword = (password) => {
    return /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/.test(password);
  };

  return {
    validateEmail,
    validatePassword,
  };
}

// composables generico
// export function useFormValidation() {
//   // 1. Oggetto di regole per ogni campo
//   const rules = {
//     email: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
//     password: (val) => val.length >= 8,
//     username: (val) => /^[a-zA-Z0-9]{3,}$/.test(val),
//   };

//   // 2. Funzione che valida i dati del form
//   function validateForm(fields) {
//     const errors = {};
//     for (const key in fields) {
//       if (rules[key]) {
//         const isValid = rules[key](fields[key]);
//         if (!isValid) {
//           errors[key] = "Errore nel campo " + key;
//         }
//       }
//     }
//     return errors;
//   }

//   // 3. Ritorna la funzione validateForm
//   return { validateForm };
// }

// rules["password"](fields["password"])
// cioè:

// rules["password"]("pass1234")
// cioè:

// (val) => val.length >= 8
// ("pass1234")
// Risultato:
// "pass1234".length >= 8 → true

// 🧑‍💻 Tutto insieme in un ciclo

// for (const key in fields) {
//   if (rules[key]) {
//     const isValid = rules[key](fields[key]);
//     // isValid sarà true o false
//   }
// }
// key è "email", "password", ecc.

// rules[key] è la funzione di validazione corrispondente

// fields[key] è il valore inserito dall’utente per quel campo

// Pensalo così:
// rules[key] = funzione da eseguire

// fields[key] = valore da controllare

// Li “combini” così:
// funzione(valore)

// Conclusione
// rules.email è una funzione

// fields.email è un valore

// rules.email(fields.email) = controlla se il valore inserito è valido
