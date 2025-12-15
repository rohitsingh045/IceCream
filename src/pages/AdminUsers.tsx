// filepath: c:\Users\rohit\OneDrive\Desktop\ICE\src\pages\AdminUsers.tsx
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { API_URL } from "@/lib/api";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import { Loader2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  role: "user" | "admin";
  createdAt: string;
}

const AdminUsers = () => {
  const { token, user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // ------------------------------
  // AUTH + ADMIN CHECK
  // ------------------------------
  useEffect(() => {
    if (!token) return;

    if (!isAuthenticated) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    if (user?.role !== "admin") {
      toast.error("Access denied — Admin only");
      navigate("/");
      return;
    }

    fetchUsers();
    // eslint-disable-next-line
  }, [token, isAuthenticated, user]);

  // ------------------------------
  // FETCH ALL USERS
  // ------------------------------
  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${API_URL}/api/users/admin/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to fetch users");
      }

      setUsers(data.users);
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  // ------------------------------
  // LOADING UI
  // ------------------------------
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center w-full">
        <div className="text-center">
          <Loader2 className="h-10 w-10 animate-spin mx-auto text-primary" />
          <p className="mt-3 text-muted-foreground">Loading users…</p>
        </div>
      </div>
    );
  }

  // ------------------------------
  // MAIN UI
  // ------------------------------
  return (
    <div className="min-h-screen w-full bg-background">
      <div className="container mx-auto px-4 py-8">

        {/* HEADER */}
        <div className="mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Users className="h-7 w-7 text-primary" />
            <div>
              <h1 className="text-3xl font-bold">All Users</h1>
              <p className="text-muted-foreground">
                View all registered users of your store.
              </p>
            </div>
          </div>

          <Link to="/admin/dashboard">
            <Button variant="outline">Go to Orders Dashboard</Button>
          </Link>
        </div>

        {/* TABLE CARD */}
        <Card>
          <CardHeader>
            <CardTitle>Users ({users.length})</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Joined</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {users.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8">
                        <p className="text-muted-foreground">
                          No users found.
                        </p>
                      </TableCell>
                    </TableRow>
                  ) : (
                    users.map((u) => (
                      <TableRow key={u._id}>
                        <TableCell className="font-mono text-xs">
                          #{u._id.slice(-8)}
                        </TableCell>
                        <TableCell>{u.name}</TableCell>
                        <TableCell>{u.email}</TableCell>
                        <TableCell>{u.phone || "-"}</TableCell>

                        <TableCell>
                          <Badge
                            variant={
                              u.role === "admin" ? "default" : "outline"
                            }
                          >
                            {u.role.toUpperCase()}
                          </Badge>
                        </TableCell>

                        <TableCell>
                          {new Date(u.createdAt).toLocaleDateString("en-IN")}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>

              </Table>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
};

export default AdminUsers;
