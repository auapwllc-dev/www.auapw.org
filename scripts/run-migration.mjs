import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

async function runMigration() {
  console.log('Creating leads table...');
  
  await sql`
    CREATE TABLE IF NOT EXISTS leads (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      phone VARCHAR(50) NOT NULL,
      year VARCHAR(10),
      make VARCHAR(100),
      model VARCHAR(100),
      part_name VARCHAR(255),
      part_category VARCHAR(100),
      message TEXT,
      status VARCHAR(50) DEFAULT 'new',
      source VARCHAR(100) DEFAULT 'quote_form',
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )
  `;
  
  console.log('Creating email_templates table...');
  
  await sql`
    CREATE TABLE IF NOT EXISTS email_templates (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL UNIQUE,
      subject VARCHAR(500) NOT NULL,
      body TEXT NOT NULL,
      template_type VARCHAR(50) DEFAULT 'customer_reply',
      is_default BOOLEAN DEFAULT false,
      variables JSONB DEFAULT '[]',
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )
  `;
  
  console.log('Creating indexes...');
  
  await sql`CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC)`;
  
  console.log('Inserting default templates...');
  
  // Insert default templates
  await sql`
    INSERT INTO email_templates (name, subject, body, template_type, is_default, variables)
    VALUES (
      'Quote Acknowledgment',
      'Your Quote Request for {{part_name}} - AUAPW.ORG',
      'Dear {{name}},

Thank you for requesting a quote from AUAPW.ORG - America''s Trusted Auto Parts Warehouse!

We have received your request for:
- Part: {{part_name}}
- Vehicle: {{year}} {{make}} {{model}}

Our team is searching our network of 2,000+ verified salvage yards to find the best match for your needs. You can expect to hear back from us within 24-48 hours with pricing and availability.

If you have any questions in the meantime, please don''t hesitate to contact us:
- Phone: (888) 818-5001
- Email: support@auapw.org

Thank you for choosing AUAPW.ORG!

Best regards,
The AUAPW Team',
      'auto_reply',
      true,
      '["name", "part_name", "year", "make", "model"]'
    )
    ON CONFLICT (name) DO NOTHING
  `;
  
  await sql`
    INSERT INTO email_templates (name, subject, body, template_type, is_default, variables)
    VALUES (
      'Quote Ready',
      'Your Quote is Ready - {{part_name}} for {{year}} {{make}} {{model}}',
      'Dear {{name}},

Great news! We found the part you''re looking for:

Part Details:
- Part: {{part_name}}
- Vehicle: {{year}} {{make}} {{model}}
- Price: ${{price}}
- Warranty: {{warranty}}

To proceed with your order, simply reply to this email or call us at (888) 818-5001.

This quote is valid for 7 days.

Best regards,
The AUAPW Team',
      'customer_reply',
      false,
      '["name", "part_name", "year", "make", "model", "price", "warranty"]'
    )
    ON CONFLICT (name) DO NOTHING
  `;
  
  await sql`
    INSERT INTO email_templates (name, subject, body, template_type, is_default, variables)
    VALUES (
      'Follow Up',
      'Following Up on Your Quote Request - AUAPW.ORG',
      'Dear {{name}},

We wanted to follow up on your recent quote request for a {{part_name}} for your {{year}} {{make}} {{model}}.

Have you had a chance to review our quote? If you have any questions or would like to discuss pricing, we''re here to help!

Call us: (888) 818-5001
Email: support@auapw.org

Thank you for considering AUAPW.ORG!

Best regards,
The AUAPW Team',
      'follow_up',
      false,
      '["name", "part_name", "year", "make", "model"]'
    )
    ON CONFLICT (name) DO NOTHING
  `;
  
  console.log('Migration completed successfully!');
}

runMigration()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Migration failed:', err);
    process.exit(1);
  });
