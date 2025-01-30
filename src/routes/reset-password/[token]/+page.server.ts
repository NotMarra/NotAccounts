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

    const { token, password, confirmPassword } = form.data;

    try {
      const response = await pb.collection('users').confirmPasswordReset(token, password, confirmPassword);

      return {
        form,
        success: true,
        message: 'Password reset successfully',
        response,
      };
    } catch (err) {
      console.error('Error occured:', err);
      return fail(500, {
        form,
        error: 'This error occurred while resseting password',
      });
    }
  },
};