import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  Box,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Typography,
  FormHelperText,
} from "@mui/material";

// Define the form schema with validation rules
const formSchema = z
  .object({
    fullName: z
      .string()
      .min(2, { message: "Name must be at least 2 characters." })
      .max(100, { message: "Name must not exceed 100 characters." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter.",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter.",
      })
      .regex(/[0-9]/, {
        message: "Password must contain at least one number.",
      }),
    confirmPassword: z.string(),
    terms: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms and conditions.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof formSchema>;

const RegistrationForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
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
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        maxWidth: 400,
        mx: "auto",
        display: "flex",
        flexDirection: "column",
        gap: 3,
        p: 4,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: "white",
      }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        Register With Us Today!
      </Typography>

      <TextField
        label="Full Name"
        {...register("fullName")}
        error={!!errors.fullName}
        helperText={errors.fullName?.message}
        fullWidth
      />

      <TextField
        label="Email"
        type="email"
        {...register("email")}
        error={!!errors.email}
        helperText={errors.email?.message}
        fullWidth
      />

      <TextField
        label="Password"
        type={showPassword ? "text" : "password"}
        {...register("password")}
        error={!!errors.password}
        helperText={errors.password?.message}
        fullWidth
        InputProps={{
          endAdornment: (
            <Button onClick={() => setShowPassword((prev) => !prev)}>
              {showPassword ? "Hide" : "Show"}
            </Button>
          ),
        }}
      />

      <TextField
        label="Confirm Password"
        type={showConfirmPassword ? "text" : "password"}
        {...register("confirmPassword")}
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword?.message}
        fullWidth
        InputProps={{
          endAdornment: (
            <Button onClick={() => setShowConfirmPassword((prev) => !prev)}>
              {showConfirmPassword ? "Hide" : "Show"}
            </Button>
          ),
        }}
      />

      <FormControlLabel
        control={<Checkbox {...register("terms")} />}
        label="I agree to the Terms and Conditions"
      />
      {errors.terms && (
        <FormHelperText error>{errors.terms.message}</FormHelperText>
      )}

      <Button type="submit" variant="contained" fullWidth>
        Register
      </Button>
    </Box>
  );
};

export default RegistrationForm;
