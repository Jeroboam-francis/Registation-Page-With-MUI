import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Define the form schema with validation rules
const formSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Name must be at least 2 characters." })
    .max(100, { message: "Name must not exceed 100 characters." }),
  email: z
    .string()
    .email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter." })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter." })
    .regex(/[0-9]/, { message: "Password must contain at least one number." }),
  confirmPassword: z.string(),
  terms: z.boolean().refine(val => val === true, {
    message: "You must accept the terms and conditions.",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"],
});

type FormValues = z.infer<typeof formSchema>;

const RegistrationForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  const onSubmit = (values: FormValues) => {
    console.log("Form Submitted:", values);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div>
        <label>Full Name</label>
        <input
          {...form.register("fullName")}
          placeholder="Full Name"
        />
        <p>{form.formState.errors.fullName?.message}</p>
      </div>

      <div>
        <label>Email</label>
        <input
          type="email"
          {...form.register("email")}
          placeholder="Email"
        />
        <p>{form.formState.errors.email?.message}</p>
      </div>

      <div>
        <label>Password</label>
        <input
          type={showPassword ? "text" : "password"}
          {...form.register("password")}
          placeholder="Password"
        />
        <button type="button" onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? "Hide" : "Show"}
        </button>
        <p>{form.formState.errors.password?.message}</p>
      </div>

      <div>
        <label>Confirm Password</label>
        <input
          type={showConfirmPassword ? "text" : "password"}
          {...form.register("confirmPassword")}
          placeholder="Confirm Password"
        />
        <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
          {showConfirmPassword ? "Hide" : "Show"}
        </button>
        <p>{form.formState.errors.confirmPassword?.message}</p>
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            {...form.register("terms")}
          />
          I agree to the Terms and Conditions
        </label>
        <p>{form.formState.errors.terms?.message}</p>
      </div>

      <button type="submit">Register</button>
    </form>
  );
};

export default RegistrationForm;
