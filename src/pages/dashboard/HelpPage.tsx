import React from 'react';
import { HelpCircle, Book, MessageCircle, Mail } from 'lucide-react';

export function HelpPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Central de Ajuda</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center mb-4">
            <Book className="h-6 w-6 text-blue-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">Guias e Tutoriais</h2>
          </div>
          <ul className="space-y-3">
            <li>
              <a href="#" className="text-blue-600 hover:text-blue-700">
                Como criar uma comunidade
              </a>
            </li>
            <li>
              <a href="#" className="text-blue-600 hover:text-blue-700">
                Organizando sua primeira partida
              </a>
            </li>
            <li>
              <a href="#" className="text-blue-600 hover:text-blue-700">
                Gerenciando membros e organizadores
              </a>
            </li>
            <li>
              <a href="#" className="text-blue-600 hover:text-blue-700">
                Criando e gerenciando torneios
              </a>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center mb-4">
            <MessageCircle className="h-6 w-6 text-blue-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">Perguntas Frequentes</h2>
          </div>
          <div className="space-y-4">
            <details className="group">
              <summary className="flex justify-between items-center cursor-pointer list-none">
                <span className="text-gray-700">Como adicionar novos jogadores?</span>
                <HelpCircle className="h-5 w-5 text-gray-400 group-open:rotate-180 transition-transform" />
              </summary>
              <p className="mt-2 text-gray-600">
                Organizadores podem adicionar novos jogadores através do menu "Cadastrar Jogador" no painel lateral.
              </p>
            </details>

            <details className="group">
              <summary className="flex justify-between items-center cursor-pointer list-none">
                <span className="text-gray-700">Como organizar um torneio?</span>
                <HelpCircle className="h-5 w-5 text-gray-400 group-open:rotate-180 transition-transform" />
              </summary>
              <p className="mt-2 text-gray-600">
                Acesse a seção "Competições" e clique em "Nova Competição". Defina as regras, participantes e datas.
              </p>
            </details>

            <details className="group">
              <summary className="flex justify-between items-center cursor-pointer list-none">
                <span className="text-gray-700">Como ver estatísticas dos jogadores?</span>
                <HelpCircle className="h-5 w-5 text-gray-400 group-open:rotate-180 transition-transform" />
              </summary>
              <p className="mt-2 text-gray-600">
                Acesse o perfil do jogador através da lista de membros da comunidade para ver suas estatísticas completas.
              </p>
            </details>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 md:col-span-2">
          <div className="flex items-center mb-4">
            <Mail className="h-6 w-6 text-blue-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">Precisa de mais ajuda?</h2>
          </div>
          <p className="text-gray-600 mb-4">
            Nossa equipe está disponível para ajudar você com qualquer dúvida ou problema.
          </p>
          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
            <Mail className="h-5 w-5 mr-2" />
            Entrar em contato
          </button>
        </div>
      </div>
    </div>
  );
}