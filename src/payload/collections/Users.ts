import type { CollectionConfig } from "payload";
import { admins } from "../access/admins";
import { adminsAndUser, adminsAndUserBoolean } from "../access/adminsAndUser";
import { loginAfterCreate } from "../hooks/loginAfterCreate";
import { protectRoles } from "../hooks/protectRoles";

export const Users: CollectionConfig = {
  slug: "users",
  auth: {
    tokenExpiration: 28800, // 8 hours
    cookies: {
      sameSite: "Lax",
      secure: true,
      domain: process.env.COOKIE_DOMAIN,
    },
  },
  labels: {
    singular: {
      en: "User",
      de: "Benutzer",
    },
    plural: {
      en: "Users",
      de: "Benutzer",
    },
  },
  access: {
    read: adminsAndUser,
    create: admins,
    update: adminsAndUser,
    delete: admins,
    unlock: admins,
    admin: adminsAndUserBoolean,
  },
  hooks: {
    afterChange: [loginAfterCreate],
  },
  admin: {
    defaultColumns: ["name", "email"],
    useAsTitle: "name",
  },
  fields: [
    {
      name: "email",
      type: "email",
      required: true,
      unique: true,
      access: {
        read: adminsAndUserBoolean,
        update: adminsAndUserBoolean,
      },
    },
    {
      name: "name",
      type: "text",
    },
    {
      name: "roles",
      label: {
        en: "Roles",
        de: "Rollen",
      },
      type: "select",
      hasMany: true,
      saveToJWT: true,
      access: {
        read: admins,
        update: admins,
        create: admins,
      },
      hooks: {
        beforeChange: [protectRoles],
      },
      options: [
        {
          label: "Admin",
          value: "admin",
        },
        {
          label: "User",
          value: "user",
        },
      ],
    },
  ],
  timestamps: true,
};
