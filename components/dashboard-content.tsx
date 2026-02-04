'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { 
  FileText, 
  Layers, 
  Download, 
  Trash2, 
  Calendar,
  Building,
  User,
  AlertCircle
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface Document {
  id: string
  document_type: string
  file_name: string
  file_url: string
  first_name: string | null
  last_name: string | null
  company_name: string | null
  position: string | null
  template_id: string | null
  created_at: string
}

interface DashboardContentProps {
  documents: Document[]
  userEmail: string
}

export function DashboardContent({ documents: initialDocuments, userEmail }: DashboardContentProps) {
  const [documents, setDocuments] = useState(initialDocuments)
  const [filter, setFilter] = useState<'all' | 'cover_letter' | 'merged_pdf'>('all')
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const supabase = createClient()

  const filteredDocuments = documents.filter(doc => {
    if (filter === 'all') return true
    return doc.document_type === filter
  })

  const handleDownload = (doc: Document) => {
    const link = document.createElement('a')
    link.href = doc.file_url
    link.download = doc.file_name
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleDelete = async (id: string) => {
    setDeletingId(id)
    try {
      const { error } = await supabase
        .from('user_documents')
        .delete()
        .eq('id', id)

      if (!error) {
        setDocuments(docs => docs.filter(d => d.id !== id))
      }
    } catch (error) {
      console.error('Error deleting document:', error)
    } finally {
      setDeletingId(null)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const coverLetterCount = documents.filter(d => d.document_type === 'cover_letter').length
  const mergedPdfCount = documents.filter(d => d.document_type === 'merged_pdf').length

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{coverLetterCount}</p>
              <p className="text-sm text-muted-foreground">Cover Letters</p>
            </div>
          </div>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <Layers className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{mergedPdfCount}</p>
              <p className="text-sm text-muted-foreground">Merged PDFs</p>
            </div>
          </div>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="truncate text-sm font-medium">{userEmail}</p>
              <p className="text-sm text-muted-foreground">Account</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2">
        {(['all', 'cover_letter', 'merged_pdf'] as const).map((filterOption) => (
          <button
            key={filterOption}
            onClick={() => setFilter(filterOption)}
            className={cn(
              'rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
              filter === filterOption
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            )}
          >
            {filterOption === 'all' ? 'All' : filterOption === 'cover_letter' ? 'Cover Letters' : 'Merged PDFs'}
          </button>
        ))}
      </div>

      {/* Documents list */}
      {filteredDocuments.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-16 text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-muted">
            <AlertCircle className="h-7 w-7 text-muted-foreground" />
          </div>
          <h3 className="mb-1 font-medium">No documents yet</h3>
          <p className="text-sm text-muted-foreground">
            Create a cover letter or merge PDFs to see them here
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredDocuments.map((doc) => (
            <div
              key={doc.id}
              className="flex items-center justify-between rounded-lg border border-border bg-card p-4 transition-shadow hover:shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className={cn(
                  'flex h-12 w-12 items-center justify-center rounded-lg',
                  doc.document_type === 'cover_letter' 
                    ? 'bg-blue-100 dark:bg-blue-900/30' 
                    : 'bg-amber-100 dark:bg-amber-900/30'
                )}>
                  {doc.document_type === 'cover_letter' ? (
                    <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  ) : (
                    <Layers className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                  )}
                </div>
                <div>
                  <p className="font-medium">{doc.file_name}</p>
                  <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                    {doc.document_type === 'cover_letter' && doc.company_name && (
                      <span className="flex items-center gap-1">
                        <Building className="h-3.5 w-3.5" />
                        {doc.company_name}
                      </span>
                    )}
                    {doc.position && (
                      <span>{doc.position}</span>
                    )}
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {formatDate(doc.created_at)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDownload(doc)}
                  className="flex items-center gap-1.5"
                >
                  <Download className="h-4 w-4" />
                  <span className="hidden sm:inline">Download</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(doc.id)}
                  disabled={deletingId === doc.id}
                  className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
