import { NextRequest, NextResponse } from 'next/server'
import { 
  getDatabaseSchema, 
  getCompleteTableInfo, 
  executeSchemaQuery 
} from '@/lib/neon'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const action = searchParams.get('action')
    const tableName = searchParams.get('table')

    switch (action) {
      case 'schema':
        // Get complete database schema
        const schema = await getDatabaseSchema()
        return NextResponse.json({ 
          success: true, 
          data: schema,
          message: 'Database schema retrieved successfully'
        })

      case 'table':
        // Get detailed information about a specific table
        if (!tableName) {
          return NextResponse.json({ 
            success: false, 
            error: 'Table name is required for table action' 
          }, { status: 400 })
        }
        
        const tableInfo = await getCompleteTableInfo(tableName)
        return NextResponse.json({ 
          success: true, 
          data: tableInfo,
          message: `Table information for ${tableName} retrieved successfully`
        })

      case 'custom':
        // Execute custom schema query (for advanced introspection)
        const query = searchParams.get('query')
        if (!query) {
          return NextResponse.json({ 
            success: false, 
            error: 'Query parameter is required for custom action' 
          }, { status: 400 })
        }

        // Basic security check - only allow SELECT statements
        if (!query.trim().toLowerCase().startsWith('select')) {
          return NextResponse.json({ 
            success: false, 
            error: 'Only SELECT queries are allowed' 
          }, { status: 403 })
        }

        const customResult = await executeSchemaQuery(query)
        return NextResponse.json({ 
          success: true, 
          data: customResult,
          message: 'Custom query executed successfully'
        })

      default:
        // Default: return available actions
        return NextResponse.json({
          success: true,
          message: 'Neon Database Schema API',
          availableActions: [
            {
              action: 'schema',
              description: 'Get complete database schema',
              example: '/api/neon-schema?action=schema'
            },
            {
              action: 'table',
              description: 'Get detailed table information',
              example: '/api/neon-schema?action=table&table=educational_resources'
            },
            {
              action: 'custom',
              description: 'Execute custom SELECT query',
              example: '/api/neon-schema?action=custom&query=SELECT * FROM information_schema.tables LIMIT 5'
            }
          ],
          schema: await getDatabaseSchema()
        })
    }

  } catch (error) {
    console.error('Neon schema API error:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to process schema request',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json()

    if (!query || typeof query !== 'string') {
      return NextResponse.json({
        success: false,
        error: 'Query is required and must be a string'
      }, { status: 400 })
    }

    // Security check for POST queries too
    if (!query.trim().toLowerCase().startsWith('select')) {
      return NextResponse.json({
        success: false,
        error: 'Only SELECT queries are allowed'
      }, { status: 403 })
    }

    const result = await executeSchemaQuery(query)
    return NextResponse.json({
      success: true,
      data: result,
      message: 'Query executed successfully'
    })

  } catch (error) {
    console.error('Neon schema POST error:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to execute query',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}