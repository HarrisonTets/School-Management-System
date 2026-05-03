import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { Plus, Search, Trash2 } from 'lucide-react'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import Modal from '../components/ui/Modal'
import FormField, { Input, Select } from '../components/ui/FormField'
import styles from './ListPage.module.css'

const EMPTY = {
  name: '',
  grade: 'Grade 8',
  gender: 'Male',
  parent: '',
  phone: '',
  status: 'Active',
  classId: '',
}

export default function Students() {
  const { students, classes, addStudent, deleteStudent } = useApp()
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(EMPTY)

  const filtered = students.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.grade.toLowerCase().includes(search.toLowerCase())
  )

  function handleChange(e) {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    addStudent({
      ...form,
      classId: form.classId ? Number(form.classId) : null,
    })
    setForm(EMPTY)
    setShowForm(false)
  }

  return (
    <div className={`${styles.page} page-enter`}>
      <div className={styles.toolbar}>
        <div className={styles.searchBox}>
          <Search size={16} className={styles.searchIcon} />
          <input
            placeholder="Search students"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        <Button icon={<Plus size={16} />} onClick={() => setShowForm(true)}>
          Add Student
        </Button>
      </div>

      <div className={styles.card}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Grade</th>
              <th>Gender</th>
              <th>Parent/Guardian</th>
              <th>Phone</th>
              <th>Class</th>
              <th>Status</th>
              <th />
            </tr>
          </thead>

          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="9" className={styles.empty}>
                  No students found.
                </td>
              </tr>
            ) : (
              filtered.map((s, i) => {
                const cls = classes.find((c) => c.id === s.classId)

                return (
                  <tr key={s.id}>
                    <td className={styles.num}>{i + 1}</td>
                    <td className={styles.name}>{s.name}</td>
                    <td>
                      <Badge color="primary">{s.grade}</Badge>
                    </td>
                    <td>{s.gender}</td>
                    <td>{s.parent}</td>
                    <td>{s.phone}</td>
                    <td>{cls ? cls.name : <span className={styles.muted}>—</span>}</td>
                    <td>
                      <Badge color={s.status === 'Active' ? 'success' : 'neutral'}>
                        {s.status}
                      </Badge>
                    </td>
                    <td>
                      <button
                        className={styles.deleteBtn}
                        onClick={() => deleteStudent(s.id)}
                        aria-label="Delete student"
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      <p className={styles.count}>
        {filtered.length} student{filtered.length !== 1 ? 's' : ''}
      </p>

      <Modal
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        title="Add New Student"
      >
        <form onSubmit={handleSubmit} className={styles.form}>
          <FormField label="Full Name" required>
            <Input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Alice Banda"
              required
            />
          </FormField>

          <div className={styles.row2}>
            <FormField label="Grade" required>
              <Select name="grade" value={form.grade} onChange={handleChange}>
                {['Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'].map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </Select>
            </FormField>

            <FormField label="Gender">
              <Select name="gender" value={form.gender} onChange={handleChange}>
                <option>Male</option>
                <option>Female</option>
              </Select>
            </FormField>
          </div>

          <FormField label="Parent / Guardian Name">
            <Input
              name="parent"
              value={form.parent}
              onChange={handleChange}
              placeholder="e.g. Mr. Banda"
            />
          </FormField>

          <div className={styles.row2}>
            <FormField label="Phone">
              <Input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="0977-000-000"
              />
            </FormField>

            <FormField label="Class">
              <Select name="classId" value={form.classId} onChange={handleChange}>
                <option value="">Unassigned</option>
                {classes.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </Select>
            </FormField>
          </div>

          <div className={styles.formActions}>
            <Button variant="secondary" type="button" onClick={() => setShowForm(false)}>
              Cancel
            </Button>
            <Button type="submit">Save Student</Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}