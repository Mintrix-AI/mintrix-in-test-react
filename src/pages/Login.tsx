import { useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { GraduationCap } from "lucide-react";
import LoginImage from "../../assets/login.png";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleError = (message: string) => {
    toast({
      title: "Login Failed",
      description: message,
      variant: "destructive",
    });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // console.log("Login attempted with:", { email, password, role });

    // if (!email || !password) {
    //   handleError("Please enter both email and password.");
    //   return;
    // }

    // if (!role) {
    //   handleError("Please select a role.");
    //   return;
    // }

    const userData = { email, role };

    try {
      // simulate API call or backend auth here
      login(userData);

      toast({
        title: "Login Successful",
        description: `Welcome, ${role} — redirecting to your dashboard.`,
      });

      navigate(`/dashboard/${role}`); // role-based redirect
    } catch (error: any) {
      handleError(error?.message || "Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-[url('../assets/login.png')] flex items-center justify-center bg-cover bg-center p-4">
      <div className="flex flex-col md:flex-row gap-6 items-center">
        {/* Login Form Card */}
        <Card className="w-full max-w-md bg-white/60 backdrop-blur-md shadow-lg">
          <CardHeader className="space-y-4 text-center">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <GraduationCap className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-2xl font-semibold">
              School ERP System
            </CardTitle>
            <CardDescription>
              Login to your dashboard
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" >User ID</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@school.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select onValueChange={setRole}>
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="teacher">Teacher</SelectItem>
                    <SelectItem value="student">Student</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Image Card */}
        <Card className="hidden md:block bg-white backdrop-blur-md p-2 max-h-[600px] w-">
          <CardContent className="p-0">
            <h1 className="text-4xl p-4 text-center text-black font-bold">Welcome to the School ERP System</h1>

            <img src="/assets/login.png" alt="" className="rounded-md h-full max-h-[600px] "/>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
