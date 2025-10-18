
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";

// ----------------------
// Validation schemas
// ----------------------

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const volunteerSchema = z.object({
  firstName: z.string().min(1, "Required"),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Required"),
  dob: z.string().min(1, "Required"),
  pronoun: z.enum(["she/her", "he/him", "they/them", "prefer not to say"]),
  occupation: z.enum(["Student", "Working", "Unemployed", "Other"]),
  pincode: z.string().min(3, "Enter a valid pincode"),
  qualification: z.enum(["10th", "12th", "UG", "PG", "Other"]),
  fieldOfStudy: z.string().optional(),
  experience: z.string().max(500).optional(),
  interests: z.array(z.string()).min(1, "Select at least one area of interest"),
  email: z.string().email({ message: "Invalid email" }),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const ngoSchema = z.object({
  ngoName: z.string().min(1, "Required"),
  registrationId: z.string().min(1, "Required"),
  domain: z.string().min(1, "Required"),
  pincode: z.string().min(3, "Enter a valid pincode"),
  contactPerson: z.string().min(1, "Required"),
  email: z.string().email({ message: "Invalid email" }),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// ----------------------
// Types
// ----------------------

type LoginForm = z.infer<typeof loginSchema>;
type VolunteerForm = z.infer<typeof volunteerSchema>;
type NGOForm = z.infer<typeof ngoSchema>;

// ----------------------
// Helper UI components
// ----------------------

const Input: React.FC<
  React.InputHTMLAttributes<HTMLInputElement> & { label?: string; error?: string }
> = ({ label, error, ...rest }) => (
  <label className="block text-sm">
    {label && <div className="mb-1 font-medium">{label}</div>}
    <input
      {...rest}
      className={`w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-offset-1 ${
        error ? "border-red-400" : "border-gray-300"
      }`}
    />
    {error && <div className="mt-1 text-xs text-red-600">{error}</div>}
  </label>
);

const Textarea: React.FC<{
  label?: string;
  error?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}> = ({ label, error, value, onChange }) => (
  <label className="block text-sm">
    {label && <div className="mb-1 font-medium">{label}</div>}
    <textarea
      value={value}
      onChange={onChange}
      rows={4}
      className={`w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-offset-1 ${
        error ? "border-red-400" : "border-gray-300"
      }`}
    />
    {error && <div className="mt-1 text-xs text-red-600">{error}</div>}
  </label>
);

// ----------------------
// Areas of interest list (example)
// ----------------------

const INTERESTS = [
  "Teaching / Tutoring",
  "After-school help",
  "Admission support",
  "Counselling / Mentoring",
  "Donation drives",
  "Fundraising",
  "Event support",
];

// ----------------------
// VolunteerFields Component
// ----------------------

function VolunteerFields({ control, register, errors, watch, setValue }: any) {
  const selectedInterests: string[] = watch("interests") || [];

  function toggleInterest(item: string) {
    const set = new Set(selectedInterests);
    if (set.has(item)) set.delete(item);
    else set.add(item);
    setValue("interests", Array.from(set));
  }

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-3">
        <Input label="First name" {...register("firstName")} error={errors?.firstName?.message} />
        <Input label="Middle name" {...register("middleName")} error={errors?.middleName?.message} />
        <Input label="Last name" {...register("lastName")} error={errors?.lastName?.message} />
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Input label="Date of birth" type="date" {...register("dob")} error={errors?.dob?.message} />

        <label className="block text-sm">
          <div className="mb-1 font-medium">Pronoun</div>
          <select {...register("pronoun")} className="w-full rounded-md border px-3 py-2">
            <option value="she/her">she/her</option>
            <option value="he/him">he/him</option>
            <option value="they/them">they/them</option>
            <option value="prefer not to say">prefer not to say</option>
          </select>
          {errors?.pronoun && <div className="mt-1 text-xs text-red-600">{errors?.pronoun?.message}</div>}
        </label>

        <label className="block text-sm">
          <div className="mb-1 font-medium">Occupation</div>
          <select {...register("occupation")} className="w-full rounded-md border px-3 py-2">
            <option value="Student">Student</option>
            <option value="Working">Working</option>
            <option value="Unemployed">Unemployed</option>
            <option value="Other">Other</option>
          </select>
          {errors?.occupation && <div className="mt-1 text-xs text-red-600">{errors?.occupation?.message}</div>}
        </label>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Input label="Pincode" {...register("pincode")} error={errors?.pincode?.message} />
        <label className="block text-sm">
          <div className="mb-1 font-medium">Highest qualification</div>
          <select {...register("qualification")} className="w-full rounded-md border px-3 py-2">
            <option value="10th">10th</option>
            <option value="12th">12th</option>
            <option value="UG">UG</option>
            <option value="PG">PG</option>
            <option value="Other">Other</option>
          </select>
          {errors?.qualification && <div className="mt-1 text-xs text-red-600">{errors?.qualification?.message}</div>}
        </label>

        <Input label="Field of study (if applicable)" {...register("fieldOfStudy")} error={errors?.fieldOfStudy?.message} />
      </div>

      <div>
        <Textarea label="Previous volunteering experience (optional)" {...{ value: watch("experience"), onChange: (e:any)=> setValue("experience", e.target.value) }} error={errors?.experience?.message} />
      </div>

      <div>
        <div className="mb-2 font-medium">Areas of interest (select 1 or more)</div>
        <div className="flex flex-wrap gap-2">
          {INTERESTS.map((i) => {
            const active = selectedInterests.includes(i);
            return (
              <button
                type="button"
                key={i}
                onClick={() => toggleInterest(i)}
                className={`px-3 py-1 rounded-md border ${active ? "bg-gray-800 text-white" : "bg-white"}`}
              >
                {i}
              </button>
            );
          })}
        </div>
        {errors?.interests && <div className="mt-1 text-xs text-red-600">{errors?.interests?.message}</div>}
      </div>

      {/* Email + Password for account creation */}
      <div className="grid grid-cols-2 gap-3">
        <Input label="Email" type="email" {...register("email")} error={errors?.email?.message} />
        <Input label="Password" type="password" {...register("password")} error={errors?.password?.message} />
      </div>
    </div>
  );
}

// ----------------------
// NGOFields Component
// ----------------------

function NGOFields({ register, errors }: any) {
  return (
    <div className="space-y-3">
      <Input label="Organization Name" {...register("ngoName")} error={errors?.ngoName?.message} />
      <div className="grid grid-cols-2 gap-3">
        <Input label="Registration ID" {...register("registrationId")} error={errors?.registrationId?.message} />
        <Input label="Domain / Primary Work" {...register("domain")} error={errors?.domain?.message} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Input label="Pincode" {...register("pincode")} error={errors?.pincode?.message} />
        <Input label="Contact Person" {...register("contactPerson")} error={errors?.contactPerson?.message} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Input label="Email" type="email" {...register("email")} error={errors?.email?.message} />
        <Input label="Password" type="password" {...register("password")} error={errors?.password?.message} />
      </div>
    </div>
  );
}

// ----------------------
// Main AuthModal component
// ----------------------
interface AuthProps {
  onClose: () => void;
}
//export default function AuthModalTemplate() {
const Auth: React.FC<AuthProps> = ({ onClose }) => {
  // modal shown by default for demo
  const [mode, setMode] = useState<"login" | "signup">("signup");
  const [role, setRole] = useState<"volunteer" | "ngo">("volunteer");

  // Login form
  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm<LoginForm>({ resolver: zodResolver(loginSchema) });

  // Signup form (union-ish by role; we'll validate based on role when submitting)
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<VolunteerForm & NGOForm>({
    defaultValues: { interests: [] },
    // we won't attach a single resolver because schema differs by role; we will run manual parse on submit
  });

  function onLogin(data: LoginForm) {
    console.log("LOGIN SUBMIT", data);
    // TODO: hook firebase auth here
    alert("Login submitted - check console for payload.");
  }

  async function onSignup(payload: any) {
    // validate according to role
    try {
      if (role === "volunteer") {
        const parsed = volunteerSchema.parse(payload);
        console.log("VOLUNTEER SIGNUP", parsed);
        alert("Volunteer signup payload logged to console.");
        // TODO: call your backend / firebase to create account + profile
      } else {
        const parsed = ngoSchema.parse(payload);
        console.log("NGO SIGNUP", parsed);
        alert("NGO signup payload logged to console.");
      }
      // on success, close modal / redirect to dashboard
      onClose();
    } catch (err: any) {
      // zod errors will be thrown when parse fails - we just log here for demo
      console.error(err);
      alert("Validation error - check console.");
    }
  }

  return (
   
      <AnimatePresence>
       
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-60 flex items-center justify-center bg-black/40"
            onClick={onClose}
          >
            <motion.div
              key="modal"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="relative w-full max-w-3xl rounded-xl bg-white shadow-xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex">
                {/* Left: content */}
                  <div className="w-full p-8">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold">Welcome</h3>
                      <button onClick={onClose} className="text-sm text-gray-500">
                      Close
                    </button>
                  </div>

                  <div className="mt-4">
                    <div className="flex gap-2 rounded-lg bg-gray-100 p-1 w-max">
                      <button
                        onClick={() => setMode("login")}
                        className={`px-4 py-2 rounded-md ${mode === "login" ? "bg-white shadow" : "text-gray-600"}`}
                      >
                        Login
                      </button>
                      <button
                        onClick={() => setMode("signup")}
                        className={`px-4 py-2 rounded-md ${mode === "signup" ? "bg-white shadow" : "text-gray-600"}`}
                      >
                        Sign up
                      </button>
                    </div>

                    {mode === "login" ? (
                      <form onSubmit={handleLoginSubmit(onLogin)} className="mt-4 space-y-4">
                        <Input label="Email" type="email" {...loginRegister("email")} error={loginErrors?.email?.message} />
                        <Input label="Password" type="password" {...loginRegister("password")} error={loginErrors?.password?.message} />
                        <div className="flex items-center justify-between">
                          <button type="submit" className="rounded-md bg-blue-600 px-4 py-2 text-white">
                            Login
                          </button>
                          <button type="button" className="text-sm text-blue-600">
                            Continue with Google
                          </button>
                        </div>
                      </form>
                    ) : (
                      <form onSubmit={handleSubmit(onSignup)} className="mt-4 space-y-4">
                        <div>
                          <div className="mb-2 font-medium">I am signing up as</div>
                          <div className="flex gap-2">
                            <label className={`cursor-pointer rounded-md px-3 py-2 border ${role === "volunteer" ? "bg-gray-800 text-white" : "bg-white"}`}>
                              <input
                                type="radio"
                                value="volunteer"
                                checked={role === "volunteer"}
                                onChange={() => setRole("volunteer")}
                                className="mr-2"
                              />
                              Volunteer
                            </label>

                            <label className={`cursor-pointer rounded-md px-3 py-2 border ${role === "ngo" ? "bg-gray-800 text-white" : "bg-white"}`}>
                              <input
                                type="radio"
                                value="ngo"
                                checked={role === "ngo"}
                                onChange={() => setRole("ngo")}
                                className="mr-2"
                              />
                              NGO
                            </label>
                          </div>
                        </div>

                        <div className="pt-3 border-t">
                          {role === "volunteer" ? (
                            <VolunteerFields control={control} register={register} errors={errors} watch={watch} setValue={setValue} />
                          ) : (
                            <NGOFields register={register} errors={errors} />
                          )}
                        </div>

                        <div className="flex items-center justify-between">
                          <button type="submit" className="rounded-md bg-green-600 px-4 py-2 text-white">
                            Create account
                          </button>

                          <button type="button" className="text-sm text-blue-600">
                            Continue with Google
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                </div>
                </div>

                {/* Right: small info / branding */}
                
            </motion.div>
          </motion.div>
          </AnimatePresence>
        );
    };
      

   export default Auth;  