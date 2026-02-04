import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { DashboardContent } from '@/components/dashboard-content'

export default async function DashboardPage() {
  const supabase = await createClient()
  
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error || !user) {
    redirect('/auth/login')
  }

  // Fetch user's documents
  const { data: documents } = await supabase
    .from('user_documents')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-10">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">My Documents</h1>
            <p className="text-muted-foreground">
              Manage your cover letters and merged PDFs
            </p>
          </div>
          <DashboardContent 
            documents={documents || []} 
            userEmail={user.email || ''} 
          />
        </div>
      </main>
      <Footer />
    </div>
  )
}
