
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactFormRequest {
  name: string;
  email: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, message }: ContactFormRequest = await req.json();

    console.log(`Received contact form submission from ${name} (${email})`);

    // Pamata validācija
    if (!name || name.length < 2) {
      return new Response(JSON.stringify({ error: "Vārds ir obligāts un jābūt vismaz 2 simboliem." }), { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders }});
    }
    if (!email || !email.includes("@")) {
      return new Response(JSON.stringify({ error: "Nederīga e-pasta adrese." }), { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders }});
    }
    if (!message || message.length < 10) {
      return new Response(JSON.stringify({ error: "Ziņojums ir obligāts un jābūt vismaz 10 simboliem." }), { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders }});
    }

    // Izmantojam Resend test adresi, lai būtu bez domēnu verifikācijas prasībām
    const emailResponse = await resend.emails.send({
      from: "Netieku.es <onboarding@resend.dev>",
      to: ["info@netieku.es"],
      subject: `Netieku.es | Kontaktformas ziņa (${name}, ${email})`,
      html: `
        <h2>Jauna ziņa no kontaktformas!</h2>
        <b>No:</b> ${name} (${email})<br/>
        <b>Ziņa:</b><br/>
        <div style="white-space: pre-wrap">${message}</div>
      `
    });

    console.log("Email send response:", JSON.stringify(emailResponse));

    if (emailResponse.error) {
      console.error("Email send error:", JSON.stringify(emailResponse.error));
      throw new Error("Neizdevās nosūtīt epastu: " + (emailResponse.error.message || JSON.stringify(emailResponse.error)));
    }

    return new Response(JSON.stringify({ ok: true, data: emailResponse.data }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Function error:", error.message || "Unknown error");
    return new Response(JSON.stringify({ error: error?.message || "Nezināma kļūda" }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
};

serve(handler);

