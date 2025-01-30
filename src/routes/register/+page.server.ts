import type { PageServerLoad } from "./$types.js";
import { superValidate } from "sveltekit-superforms";
import { formSchema } from "./schema.js";
import { zod } from "sveltekit-superforms/adapters";
import { fail } from "@sveltejs/kit";
import { pb } from "$lib/pb.js";
 
export const load: PageServerLoad = async () => {
 return {
  form: await superValidate(zod(formSchema)),
 };
};

export const actions = {
  default: async ({ request }) => {
    const form = await superValidate(request, zod(formSchema));

    if (!form.valid) {
      return fail(400, { form });
    }

    const { username, email, password } = form.data;

    try {
      const newUser = await pb.collection('users').create({
        username,
        email,
        password,
        passwordConfirm: password,
      });

      //console.log('User created:', newUser);

      const authData = await pb.collection('users').authWithPassword(email, password);
      await pb.collection('users').requestVerification(email);
      window.location.href = '/login';

      return {
        form,
        success: true,
        message: 'User created and logged in',
        authData,
      };
    } catch (err) {
      console.error('Error with creating an user:', err);
      return fail(500, {
        form,
        error: 'This error occurred while creating an user',
      });
    }
  },
};