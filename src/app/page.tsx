"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

// Zod schema for form validation
const formSchema = z.object({
  matricNumber: z.string().min(1, "Matric number is required"),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  gender: z.enum(["Male", "Female"], { required_error: "Gender is required" }),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.string().min(1, "Address is required"),
  dob: z.string().min(1, "Date of birth is required"),
});

type FormData = z.infer<typeof formSchema>;

export default function RegistrationForm() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<FormData[]>([]); // State to store fetched users

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      matricNumber: "",
      name: "",
      email: "",
      gender: undefined,
      phone: "",
      address: "",
      dob: "",
    },
  });

  // const fetchStudents = async () => {
  //   try {
  //     const response = await fetch("/api/registration");
  //     if (!response.ok) {
  //       throw new Error("Failed to fetch students");
  //     }
  //     const data = await response.json();
  //     setUsers(data.reverse()); // Reverse the list to show the newest first
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const onSubmit = async (data: FormData) => {
  //   setLoading(true);
  //   try {
  //     const response = await fetch("/api/registration", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(data),
  //     });

  //     const result = await response.json();

  //     if (!response.ok) {
  //       alert(result.message); // Display the error message from the server
  //     } else {
  //       alert(result.message); // Success message
  //       await fetchStudents(); // Refetch students after successful submission
  //     }
  //   } catch (error) {
  //     console.error("An unexpected error occurred:", error);
  //     alert("An unexpected error occurred. Please try again.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
const [newUserId, setNewUserId] = useState(null); // Track the ID of the newly added user


  const fetchStudents = async () => {
    try {
      const response = await fetch("/api/registration");
      if (!response.ok) {
        throw new Error("Failed to fetch students");
      }
      const data = await response.json();
      setUsers(data.reverse()); // Reverse to display newest first
      // If there is a new user added, set the new user ID to trigger animation
      if (data.length > 0) {
        setNewUserId(data[0].email); // Use the matricNumber or a unique ID as the identifier
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const response = await fetch("/api/registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.message); // Display the error message from the server
      } else {
        alert(result.message); // Success message
        // Call the function to fetch and display updated list with the new user highlighted
        fetchStudents();
        form.reset(); // Reset the form fields after successful submission
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      alert("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents(); // Fetch students on initial render
  }, []);

  return (
    <div className="px-[5vw] py-[4vw]">
      <h1 className="text-6xl text-center py-4">Student Registration Form</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex w-full justify-between items-center gap-10">
            <div className="w-full">
              {/* Matric Number */}
              <FormField
                control={form.control}
                name="matricNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Matric Number</FormLabel>
                    <FormControl>
                      <Input
                        className="border-gray-300 p-3 rounded-md shadow-sm"
                        placeholder="Enter matric number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full">
              {" "}
              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        className="border-gray-300 p-3 rounded-md shadow-sm"
                        placeholder="Enter your name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex w-full justify-between items-center gap-10">
            <div className="w-full">
              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        className="border-gray-300 p-3 rounded-md shadow-sm"
                        placeholder="Enter your email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full">
              {" "}
              {/* Gender */}
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full p-3 bg-white border-gray-300 rounded-md shadow-sm">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex w-full justify-between items-center gap-10">
            <div className="w-full">
              {" "}
              {/* Phone */}
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input
                        className="border-gray-300 p-3 rounded-md shadow-sm"
                        placeholder="Enter phone number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </div>

            {/* Address */}
            <div className="w-full">
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input
                        className="border-gray-300 p-3 rounded-md shadow-sm"
                        placeholder="Enter address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Date of Birth */}
          <FormField
            control={form.control}
            name="dob"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date of Birth</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    className="border-gray-300 p-3 rounded-md shadow-sm"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </Form>

      {/* Table to display users */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Registered Users</h2>
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-3 px-6 text-left border-b">#</th>
              <th className="py-3 px-6 text-left border-b">Matric Number</th>
              <th className="py-3 px-6 text-left border-b">Name</th>
              <th className="py-3 px-6 text-left border-b">Email</th>
              <th className="py-3 px-6 text-left border-b">Gender</th>
              <th className="py-3 px-6 text-left border-b">Phone</th>
              <th className="py-3 px-6 text-left border-b">Address</th>
              <th className="py-3 px-6 text-left border-b">Date of Birth</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={index} // Use index as a unique key for now
                className={user.email === newUserId ? "new-user" : ""} // Apply "new-user" class to the first item in the list
              >
                <td className="py-3 px-6 border-b">{index + 1}</td>
                <td className="py-3 px-6 border-b">{user.matricNumber}</td>
                <td className="py-3 px-6 border-b">{user.name}</td>
                <td className="py-3 px-6 border-b">{user.email}</td>
                <td className="py-3 px-6 border-b">{user.gender}</td>
                <td className="py-3 px-6 border-b">{user.phone}</td>
                <td className="py-3 px-6 border-b">{user.address}</td>
                <td className="py-3 px-6 border-b">{user.dob}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
