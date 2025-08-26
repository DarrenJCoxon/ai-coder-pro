import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import { sql } from 'drizzle-orm'

// Initialize Neon client
const neonClient = neon(process.env.NEON_DATABASE_URL!)

// Initialize Drizzle ORM with Neon
export const db = drizzle(neonClient)

// Helper function to get database schema information
export async function getDatabaseSchema() {
  try {
    const result = await db.execute(sql`
      SELECT table_name, table_schema 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `)
    return result.rows
  } catch (error) {
    console.error('Error fetching database schema:', error)
    return null
  }
}

// Helper function to get table columns with detailed information
export async function getTableColumns(tableName: string) {
  try {
    const result = await db.execute(sql`
      SELECT 
        column_name,
        data_type,
        is_nullable,
        column_default,
        character_maximum_length,
        numeric_precision,
        numeric_scale
      FROM information_schema.columns 
      WHERE table_name = ${tableName} 
        AND table_schema = 'public'
      ORDER BY ordinal_position
    `)
    return result.rows
  } catch (error) {
    console.error('Error fetching table columns:', error)
    return null
  }
}

// Helper function to get table relationships/foreign keys
export async function getTableRelationships(tableName: string) {
  try {
    const result = await db.execute(sql`
      SELECT
        tc.constraint_name,
        tc.table_name,
        kcu.column_name,
        ccu.table_name AS foreign_table_name,
        ccu.column_name AS foreign_column_name
      FROM information_schema.table_constraints AS tc
      JOIN information_schema.key_column_usage AS kcu
        ON tc.constraint_name = kcu.constraint_name
        AND tc.table_schema = kcu.table_schema
      JOIN information_schema.constraint_column_usage AS ccu
        ON ccu.constraint_name = tc.constraint_name
        AND ccu.table_schema = tc.table_schema
      WHERE tc.constraint_type = 'FOREIGN KEY'
        AND tc.table_name = ${tableName}
        AND tc.table_schema = 'public'
    `)
    return result.rows
  } catch (error) {
    console.error('Error fetching table relationships:', error)
    return null
  }
}

// Helper function to get indexes for a table
export async function getTableIndexes(tableName: string) {
  try {
    const result = await db.execute(sql`
      SELECT
        i.relname AS index_name,
        idx.indisunique AS is_unique,
        idx.indisprimary AS is_primary,
        array_agg(a.attname ORDER BY c.ordinality) AS column_names
      FROM pg_class t
      JOIN pg_index idx ON t.oid = idx.indrelid
      JOIN pg_class i ON i.oid = idx.indexrelid
      JOIN pg_attribute a ON a.attrelid = t.oid
      JOIN unnest(idx.indkey) WITH ORDINALITY AS c(colnum, ordinality) ON a.attnum = c.colnum
      WHERE t.relname = ${tableName}
        AND t.relkind = 'r'
      GROUP BY i.relname, idx.indisunique, idx.indisprimary
      ORDER BY i.relname
    `)
    return result.rows
  } catch (error) {
    console.error('Error fetching table indexes:', error)
    return null
  }
}

// Helper function to get complete table information
export async function getCompleteTableInfo(tableName: string) {
  try {
    const [columns, relationships, indexes] = await Promise.all([
      getTableColumns(tableName),
      getTableRelationships(tableName),
      getTableIndexes(tableName)
    ])

    return {
      tableName,
      columns,
      relationships,
      indexes
    }
  } catch (error) {
    console.error('Error fetching complete table info:', error)
    return null
  }
}

// Helper function to execute raw SQL for schema introspection
export async function executeSchemaQuery(query: string) {
  try {
    const result = await db.execute(sql.raw(query))
    return result.rows
  } catch (error) {
    console.error('Error executing schema query:', error)
    return null
  }
}