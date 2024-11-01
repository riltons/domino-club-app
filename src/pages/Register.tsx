import React from 'react';
import { Link } from 'react-router-dom';
import { User, Shield, Boxes } from 'lucide-react';

export function Register() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <Boxes className="h-12 w-12 text-blue-600" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Criar Conta</h2>
          <p className="mt-2 text-sm text-gray-600">
            Já tem uma conta?{' '}
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Entre aqui
            </Link>
          </p>
        </div>

        <div className="mt-8 space-y-4">
          <Link
            to="/register/organizer"
            className="relative w-full flex items-center justify-center px-4 py-4 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            <Shield className="h-5 w-5 text-blue-600 mr-3" />
            <span>Cadastrar como Administrador/Organizador</span>
          </Link>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gradient-to-br from-blue-50 to-indigo-50 text-gray-500">
                Jogadores são cadastrados pelos organizadores
              </span>
            </div>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-gray-600">
          Ao se cadastrar, você concorda com nossos{' '}
          <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
            Termos de Serviço
          </a>{' '}
          e{' '}
          <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
            Política de Privacidade
          </a>
        </p>
      </div>
    </div>
  );
}