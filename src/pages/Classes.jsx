import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { Plus, Trash2, Users } from 'lucide-react'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import Modal from '../components/ui/Modal'
import FormField, { Input, Select } from '../components/ui/FormField'
import styles from './ListPage.module.css'

const EMPTY = { name:'', grade:'Grade 8', room:'', teacherId:'', capacity: 40 }

export default function Classes() {
  const { classes, teachers, students, addClass, deleteClass } = useApp()
  const [showForm, setShowForm] = useState(false)
  const [form,     setForm]     = useState(EMPTY)

  function handleSubmit(e) {
    e.preventDefault()
    addClass({ ...form, teacherId: form.teacherId ? Number(form.teacherId) : null, capacity: Number(form.capacity) })
    setForm(EMPTY); setShowForm(false)
  }

  return (
    <div className={`${styles.page} page-enter`}>
      <div className={styles.toolbar}>
        <div /> {/* spacer */}
        <Button icon={<Plus size={16} />} onClick={() => setShowForm(true)}>Add Class</Button>
      </div>

      <div className={styles.classGrid}>
        {classes.map(cls => {
          const teacher = teachers.find(t => t.id === cls.teacherId)
          const count   = students.filter(s => s.classId === cls.id).length
          const pct     = Math.round((count / cls.capacity) * 100)
          return (
            <div key={cls.id} className={styles.classCard}>
              <div className={styles.classCardHeader}>
                <div>
                  <h3 className={styles.classCardName}>{cls.name}</h3>
                  <p className={styles.classCardRoom}>{cls.room}</p>
                </div>
                <button className={styles.deleteBtn} onClick={() => deleteClass(cls.id)} aria-label="Delete class">
                  <Trash2 size={14} />
                </button>
              </div>
              <div className={styles.classCardInfo}>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Teacher</span>
                  <span>{teacher ? teacher.name : <span className={styles.muted}>Unassigned</span>}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Subject</span>
                  <span>{teacher ? <Badge color="purple">{teacher.subject}</Badge> : '—'}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>
                    <Users size={12} /> Students
                  </span>
                  <span>{count} / {cls.capacity}</span>
                </div>
              </div>
              <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{ width: `${pct}%`, background: pct > 90 ? 'var(--color-danger)' : 'var(--color-primary)' }} />
              </div>
            </div>
          )
        })}
      </div>

      <Modal isOpen={showForm} onClose={() => setShowForm(false)} title="Add New Class">
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.row2}>
            <FormField label="Class Name" required>
              <Input name="name" value={form.name} onChange={e => setForm(f=>({...f,name:e.target.value}))} placeholder="e.g. Grade 8A" required />
            </FormField>
            <FormField label="Grade" required>
              <Select name="grade" value={form.grade} onChange={e => setForm(f=>({...f,grade:e.target.value}))}>
                {['Grade 8','Grade 9','Grade 10','Grade 11','Grade 12'].map(g=><option key={g}>{g}</option>)}
              </Select>
            </FormField>
          </div>
          <div className={styles.row2}>
            <FormField label="Room">
              <Input name="room" value={form.room} onChange={e => setForm(f=>({...f,room:e.target.value}))} placeholder="e.g. Room 101" />
            </FormField>
            <FormField label="Capacity">
              <Input name="capacity" type="number" min={1} max={100} value={form.capacity} onChange={e => setForm(f=>({...f,capacity:e.target.value}))} />
            </FormField>
          </div>
          <FormField label="Assign Teacher">
            <Select name="teacherId" value={form.teacherId} onChange={e => setForm(f=>({...f,teacherId:e.target.value}))}>
              <option value="">— Unassigned —</option>
              {teachers.map(t=><option key={t.id} value={t.id}>{t.name} ({t.subject})</option>)}
            </Select>
          </FormField>
          <div className={styles.formActions}>
            <Button variant="secondary" type="button" onClick={() => setShowForm(false)}>Cancel</Button>
            <Button type="submit">Save Class</Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}