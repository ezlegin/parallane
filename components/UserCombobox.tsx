"use client"

import { Check, ChevronsUpDown, Loader2 } from "lucide-react"
import { useEffect, useState } from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { searchUsers } from "@/lib/user"

type UserOption = {
  id: string
  email: string
  fullName: string
}

function UserCombobox({
  value,
  onChange,
  initialUser,
}: {
  value: string
  initialUser?: UserOption
  onChange: (value: string) => void
}) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [users, setUsers] = useState<UserOption[]>([])
  const [selectedUser, setSelectedUser] = useState<UserOption | null>(
    initialUser ?? null
  )
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!query.trim()) {
      setUsers([])
      return
    }

    const timeout = setTimeout(async () => {
      setLoading(true)

      const result = await searchUsers(query)

      if (result.users) {
        setUsers(result.users)
      }

      setLoading(false)
    }, 300)

    return () => clearTimeout(timeout)
  }, [query])

  useEffect(() => {
    if (!value) {
      setSelectedUser(null)
    }
  }, [value])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
            type="button"
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between font-normal"
          >
            {selectedUser ? (
              <span className="truncate">
                {selectedUser.fullName}{" "}
                <span className="text-muted-foreground">
                  {selectedUser.email}
                </span>
              </span>
            ) : (
              <span className="text-muted-foreground">
                Search user by email...
              </span>
            )}

            <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
          </Button>
        }
      />

      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Search by email or name..."
            value={query}
            onValueChange={setQuery}
          />

          <CommandList>
            {loading ? (
              <div className="flex items-center justify-center py-6">
                <Loader2 className="size-4 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <>
                <CommandEmpty>
                  {query ? "No users found." : "Start typing to search."}
                </CommandEmpty>

                <CommandGroup>
                  {users.map((user) => (
                    <CommandItem
                      key={user.id}
                      value={user.id}
                      onSelect={() => {
                        setSelectedUser(user)
                        onChange(user.id)
                        setOpen(false)
                        setQuery("")
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 size-4",
                          value === user.id ? "opacity-100" : "opacity-0"
                        )}
                      />

                      <div className="min-w-0">
                        <p className="truncate text-sm">{user.email}</p>

                        <p className="truncate text-xs text-muted-foreground">
                          {user.fullName}
                        </p>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default UserCombobox
