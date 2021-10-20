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
        TupleField,
    },
} = SolidSchema;

const UserSchema = new ObjectField({
    firstname: new StringField(),
    lastname: new OptionalField(new StringField()),
    age: new NumberField(),
    enrolled: new BooleanField(),
    gender: new TupleField(["Male", "Female"] as const),
});

const validUser = UserSchema.create({
    firstname: "Alan",
    lastname: undefined,
    age: 25,
    enrolled: false,
    gender: "Male",
});

const validUser = UserSchema.create({
    firstname: "Alan",
    lastname: "Walker",
    age: "?", // "Type 'string' is not assignable to type 'number'." and will throw error in runtime
    enrolled: false,
    gender: "?", // "Type 'string' is not assignable to type '"hello" | "world"'." and will throw error in runtime
});
```
