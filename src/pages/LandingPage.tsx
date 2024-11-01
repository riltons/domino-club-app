import React from 'react';
import { Link } from 'react-router-dom';
import { Boxes, Users, Trophy, Star, ArrowRight, Shield, Target, TrendingUp } from 'lucide-react';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <Boxes className="h-16 w-16 text-blue-600 mx-auto mb-6" />
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl mb-4">
              DominóClub
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              A plataforma definitiva para organizar suas partidas de dominó, 
              gerenciar comunidades e acompanhar estatísticas dos jogadores.
            </p>
            <div className="flex justify-center gap-4">
              <Link
                to="/register"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700"
              >
                Começar agora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50"
              >
                Já tenho conta
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center p-6 bg-gray-50 rounded-xl">
              <Users className="h-8 w-8 text-blue-600 mb-3" />
              <div className="text-2xl font-bold text-gray-900">500+</div>
              <div className="text-sm text-gray-600">Jogadores Ativos</div>
            </div>
            <div className="flex flex-col items-center p-6 bg-gray-50 rounded-xl">
              <Trophy className="h-8 w-8 text-blue-600 mb-3" />
              <div className="text-2xl font-bold text-gray-900">1000+</div>
              <div className="text-sm text-gray-600">Partidas Realizadas</div>
            </div>
            <div className="flex flex-col items-center p-6 bg-gray-50 rounded-xl">
              <Shield className="h-8 w-8 text-blue-600 mb-3" />
              <div className="text-2xl font-bold text-gray-900">50+</div>
              <div className="text-sm text-gray-600">Comunidades</div>
            </div>
            <div className="flex flex-col items-center p-6 bg-gray-50 rounded-xl">
              <Target className="h-8 w-8 text-blue-600 mb-3" />
              <div className="text-2xl font-bold text-gray-900">98%</div>
              <div className="text-sm text-gray-600">Satisfação</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Tudo que você precisa em um só lugar
          </h2>
          <p className="text-lg text-gray-600">
            Gerencie suas partidas e comunidades com ferramentas profissionais
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <Users className="h-8 w-8 text-blue-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Gerencie Comunidades
            </h3>
            <p className="text-gray-600">
              Crie e gerencie comunidades de jogadores, organize partidas e mantenha todos conectados.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <Trophy className="h-8 w-8 text-blue-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Acompanhe Rankings
            </h3>
            <p className="text-gray-600">
              Mantenha rankings atualizados, estatísticas de jogadores e histórico de partidas.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <Star className="h-8 w-8 text-blue-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Organize Competições
            </h3>
            <p className="text-gray-600">
              Crie torneios, defina regras e acompanhe o desempenho dos participantes.
            </p>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              O que dizem nossos usuários
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="User"
                  className="h-12 w-12 rounded-full"
                />
                <div className="ml-4">
                  <div className="font-medium text-gray-900">Carlos Silva</div>
                  <div className="text-sm text-gray-500">Organizador</div>
                </div>
              </div>
              <p className="text-gray-600">
                "Excelente plataforma para gerenciar nossas partidas. Facilitou muito a organização dos torneios."
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="User"
                  className="h-12 w-12 rounded-full"
                />
                <div className="ml-4">
                  <div className="font-medium text-gray-900">Ana Costa</div>
                  <div className="text-sm text-gray-500">Jogadora</div>
                </div>
              </div>
              <p className="text-gray-600">
                "Agora posso acompanhar meu desempenho e evolução nas partidas. Interface muito intuitiva!"
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <img
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="User"
                  className="h-12 w-12 rounded-full"
                />
                <div className="ml-4">
                  <div className="font-medium text-gray-900">Pedro Lima</div>
                  <div className="text-sm text-gray-500">Administrador</div>
                </div>
              </div>
              <p className="text-gray-600">
                "O melhor sistema para gerenciar comunidades de dominó. Recomendo para todos os organizadores!"
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Pronto para organizar suas partidas?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Junte-se a milhares de jogadores e organizadores.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-blue-600 bg-white hover:bg-blue-50"
          >
            Criar minha conta
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center">
                <Boxes className="h-8 w-8 text-blue-600 mr-2" />
                <span className="text-xl font-bold text-gray-900">DominóClub</span>
              </div>
              <p className="mt-4 text-gray-600">
                A plataforma definitiva para organizar suas partidas de dominó.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Produto</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="#" className="text-gray-600 hover:text-gray-900">
                    Recursos
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-gray-600 hover:text-gray-900">
                    Preços
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-gray-600 hover:text-gray-900">
                    Comunidades
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Suporte</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="#" className="text-gray-600 hover:text-gray-900">
                    Ajuda
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-gray-600 hover:text-gray-900">
                    Contato
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-gray-600 hover:text-gray-900">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Legal</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="#" className="text-gray-600 hover:text-gray-900">
                    Privacidade
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-gray-600 hover:text-gray-900">
                    Termos
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-center text-gray-600">
              © 2024 DominóClub. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}