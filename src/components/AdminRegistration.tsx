import React, { useState } from 'react';
import { User, Mail, Lock, Shield, Camera, ArrowRight } from 'lucide-react';

export function AdminRegistration() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    avatar: ''
  });
  const [step, setStep] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData(prev => ({
          ...prev,
          avatar: event.target?.result as string
        }));
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <Shield className="mx-auto h-12 w-12 text-blue-600" />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Cadastro de Administrador</h2>
          <p className="mt-2 text-sm text-gray-600">
            Configure sua conta para gerenciar suas comunidades de dominó
          </p>
        </div>

        <div className="bg-white py-8 px-4 shadow-lg rounded-xl sm:px-10">
          <div className="mb-8 flex justify-between">
            {[1, 2].map((i) => (
              <div
                key={i}
                className={`flex items-center ${i === 1 ? 'w-full' : ''}`}
              >
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full border-2 
                    ${step >= i ? 'border-blue-600 bg-blue-600 text-white' : 'border-gray-300 text-gray-300'}`}
                >
                  {i}
                </div>
                {i === 1 && (
                  <div className="flex-1 h-0.5 mx-4 bg-gray-200">
                    <div
                      className={`h-0.5 bg-blue-600 transition-all duration-500`}
                      style={{ width: step > 1 ? '100%' : '0%' }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 ? (
              <>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Nome completo
                  </label>
                  <div className="mt-1 relative">
                    <input
                      id="name"
                      type="text"
                      required
                      className="appearance-none block w-full px-3 py-2 pl-10 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    />
                    <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <div className="mt-1 relative">
                    <input
                      id="email"
                      type="email"
                      required
                      className="appearance-none block w-full px-3 py-2 pl-10 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    />
                    <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Senha
                  </label>
                  <div className="mt-1 relative">
                    <input
                      id="password"
                      type="password"
                      required
                      className="appearance-none block w-full px-3 py-2 pl-10 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      value={formData.password}
                      onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    />
                    <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                    Confirmar senha
                  </label>
                  <div className="mt-1 relative">
                    <input
                      id="confirmPassword"
                      type="password"
                      required
                      className="appearance-none block w-full px-3 py-2 pl-10 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    />
                    <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>

                <div>
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Próximo
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="text-center">
                  <div className="relative mx-auto w-32 h-32 mb-4">
                    <div className="w-full h-full rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                      {formData.avatar ? (
                        <img
                          src={formData.avatar}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Camera className="h-12 w-12 text-gray-400" />
                      )}
                    </div>
                    <label
                      htmlFor="avatar"
                      className="absolute bottom-0 right-0 bg-blue-600 rounded-full p-2 cursor-pointer hover:bg-blue-700"
                    >
                      <Camera className="h-5 w-5 text-white" />
                      <input
                        type="file"
                        id="avatar"
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                    </label>
                  </div>
                  <p className="text-sm text-gray-500 mb-6">
                    Adicione uma foto para seu perfil (opcional)
                  </p>
                </div>

                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Voltar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Concluir cadastro
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}