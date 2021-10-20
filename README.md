# Solid Schema

Easy create schemas with Typescript support!

## Example

```ts
import SolidSchema from "solid-schema";

const {
    Fields: {
        StringField,
        NumberField,
        BooleanField,
        OptionalField,
        ObjectField,
    },
} = SolidSchema;

const UserSchema = new ObjectField({
    firstname: new StringField(),
    lastname: new OptionalField(new StringField()),
    age: new NumberField(),
    enrolled: new BooleanField(),
});

const validUser = UserSchema.create({
    firstname: "Alan",
    lastname: undefined,
    age: 25,
    enrolled: false,
});

const validUser = UserSchema.create({
    firstname: "Alan",
    lastname: "Walker",
    age: "what", // "Type 'string' is not assignable to type 'number'." and will throw error on runtime
    enrolled: false,
});
```
