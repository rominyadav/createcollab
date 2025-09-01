import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";

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
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Moderator Management
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Manage moderator accounts and permissions
          </p>
        </div>
        <Button variant="emerald" className="flex items-center gap-2">
          <Icon name="plus" size="sm" />
          Add Moderator
        </Button>
      </div>

      <div className="grid gap-6">
        {moderators.map((moderator) => (
          <Card
            key={moderator.id}
            className="border-gray-200 bg-white dark:border-slate-600 dark:bg-slate-700"
          >
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
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {moderator.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {moderator.email}
                    </p>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {moderator.role}
                      </span>
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                          moderator.status === "active"
                            ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200"
                            : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
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
                    <Icon name="edit" size="sm" className="mr-2" />
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleAction(moderator.id, "delete")}
                  >
                    <Icon name="trash" size="sm" className="mr-2" />
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
