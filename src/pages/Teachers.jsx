import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { Plus, Search, Trash2 } from 'lucide-react'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import Modal from '../components/ui/Modal'
import FormField, { Input, Select } from '../components/ui/FormField'
import styles from './ListPage.module.css'

const SUBJECTS = ['Mathematics','English','Science','Social Studies','ICT','French','Physical Education','Art','Music']
const EMPTY = { name:'', subject:'Mathematics', phone:'', email:'', status:'Active', classId:'' }

export default function Teachers() {
  const { teachers, classes, addTeacher, deleteTeacher } = useApp()
  const [search,   setSearch]   = useState('')
  const [showForm, setShowForm] = useState(false)
  const [form,     setForm]     = useState(EMPTY)

  const filtered = teachers.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.subject.toLowerCase().includes(search.toLowerCase())
  )

  function handleSubmit(e) {
    e.preventDefault()
    addTeacher({ ...form, classId: form.classId ? Number(form.classId) : null })
    setForm(EMPTY); setShowForm(false)
  }

  return (
    <div className={`${styles.page} page-enter`}>
      <div className={styles.toolbar}>
        <div className={styles.searchBox}>
          <Search size={16} className={styles.searchIcon} />
          <input placeholder="Search teachers…" value={search} onChange={e => setSearch(e.target.value)} className={styles.searchInput} />
        </div>
        <Button icon={<Plus size={16} />} onClick={() => setShowForm(true)}>Add Teacher</Button>
      </div>

      <div className={styles.card}>
        <table className={styles.table}>
          <thead>
            <tr><th>#</th><th>Name</th><th>Subject</th><th>Phone</th><th>Email</th><th>Class</th><th>Status</th><th></th></tr>
          </thead>
          <tbody>
            {filtered.length === 0 && <tr><td colSpan={8} className={styles.empty}>No teachers found.</td></tr>}
            {filtered.map((t, i) => {
              const cls = classes.find(c => c.id === t.classId)
              return (
                <tr key={t.id}>
                  <td className={styles.num}>{i + 1}</td>
                  <td className={styles.name}>{t.name}</td>
                  <td><Badge color="purple">{t.subject}</Badge></td>
                  <td>{t.phone}</td>
                  <td>{t.email}</td>
                  <td>{cls ? cls.name : <span className={styles.muted}>—</span>}</td>
                  <td><Badge color={t.status === 'Active' ? 'success' : 'neutral'}>{t.status}</Badge></td>
                  <td>
                    <button className={styles.deleteBtn} onClick={() => deleteTeacher(t.id)} aria-label="Delete teacher">
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <p className={styles.count}>{filtered.length} teacher{filtered.length !== 1 ? 's' : ''}</p>

      <Modal isOpen={showForm} onClose={() => setShowForm(false)} title="Add New Teacher">
        <form onSubmit={handleSubmit} className={styles.form}>
          <FormField label="Full Name" required>
            <Input name="name" value={form.name} onChange={e => setForm(f=>({...f,name:e.target.value}))} placeholder="e.g. Mr. Joseph Mutale" required />
          </FormField>
          <div className={styles.row2}>
            <FormField label="Subject" required>
              <Select name="subject" value={form.subject} onChange={e => setForm(f=>({...f,subject:e.target.value}))}>
                {SUBJECTS.map(s => <option key={s}>{s}</option>)}
              </Select>
            </FormField>
            <FormField label="Assign to Class">
              <Select name="classId" value={form.classId} onChange={e => setForm(f=>({...f,classId:e.target.value}))}>
                <option value="">— Unassigned —</option>
                {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </Select>
            </FormField>
          </div>
          <FormField label="Phone">
            <Input name="phone" value={form.phone} onChange={e => setForm(f=>({...f,phone:e.target.value}))} placeholder="0977-000-000" />
          </FormField>
          <FormField label="Email">
            <Input name="email" type="email" value={form.email} onChange={e => setForm(f=>({...f,email:e.target.value}))} placeholder="name@school.zm" />
          </FormField>
          <div className={styles.formActions}>
            <Button variant="secondary" type="button" onClick={() => setShowForm(false)}>Cancel</Button>
            <Button type="submit">Save Teacher</Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}