"use client"
import React, { useState } from 'react'
import { jsPDF } from 'jspdf'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const generatePDF = () => {
    const doc = new jsPDF()
    
    doc.setFontSize(18)
    doc.text('Datos del formulario', 20, 20)
    
    doc.setFontSize(12)
    doc.text(`Nombre: ${formData.name}`, 20, 40)
    doc.text(`Email: ${formData.email}`, 20, 50)
    doc.text(`Mensaje: ${formData.message}`, 20, 60)
    
    doc.save('formulario.pdf')
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Formulario de datos</CardTitle>
          <CardDescription>Ingrese sus datos para generar un PDF</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Mensaje</Label>
              <Input
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button onClick={generatePDF} className="w-full">Generar PDF</Button>
        </CardFooter>
      </Card>
    </div>
  )
}