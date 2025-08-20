import { Edit, Plus, Trash2 } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";

interface Moderator {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
}

// Mock data - in real app, this would come from props or context
const moderators: Moderator[] = [
  {
    id: 1,
    name: "John Admin",
    email: "john@example.com",
    role: "Super Admin",
    status: "active",
  },
  {
    id: 2,
    name: "Sarah Mod",
    email: "sarah@example.com",
    role: "Content Moderator",
    status: "active",
  },
];

export function ModeratorManagement() {
  const handleAction = (moderatorId: number, action: "edit" | "delete") => {
    console.log(`${action} moderator ${moderatorId}`);
    // In real app, you'd implement the actual logic
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Moderator Management
          </h2>
          <p className="text-gray-600">
            Manage moderator accounts and permissions
          </p>
        </div>
        <Button variant="emerald" className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Moderator
        </Button>
      </div>

      <div className="grid gap-6">
        {moderators.map((moderator) => (
          <Card key={moderator.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarFallback className="bg-gradient-to-r from-purple-400 to-pink-500 text-white">
                      {moderator.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-semibold">{moderator.name}</h3>
                    <p className="text-gray-600">{moderator.email}</p>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="text-sm text-gray-500">
                        {moderator.role}
                      </span>
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                          moderator.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {moderator.status}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleAction(moderator.id, "edit")}
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleAction(moderator.id, "delete")}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
