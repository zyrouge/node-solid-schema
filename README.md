# Solid Schema

Easily create type-safe schemas with runtime type check!

## Example

```ts
import { fields } from "solid-schema";

const UserSchema = fields.object({
    firstname: fields.string(),
    lastname: fields.nullable(fields.string()),
    age: fields.number(),
    enrolled: fields.boolean(),
    gender: fields.or(
        fields.constant("Male" as const),
        fields.constant("Female" as const)
    ),
    details: fields.tuple(
        fields.or(
            fields.constant("Manager" as const),
            fields.constant("Supervisor" as const)
        ),
        fields.number()
    ),
});

const validUser = UserSchema.create({
    firstname: "Alan",
    lastname: undefined,
    age: 25,
    enrolled: false,
    gender: "Male",
    details: ["Manager", 1],
});

const invalidUser = UserSchema.create({
    firstname: "Alan",
    lastname: "Walker",
    age: "?", // "Type 'string' is not assignable to type 'number'." and will throw error in runtime
    enrolled: false,
    gender: "?", // "Type 'string' is not assignable to type '"hello" | "world"'." and will throw error in runtime
    details: ["?"], // "Argument of type '[string]' is not assignable to parameter of type '["Manager" | "Supervisor", number]'." and will throw error in runtime
});
```
