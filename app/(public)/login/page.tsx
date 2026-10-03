'use client';

import { useActionState } from 'react';
import { authenticate } from '@/lib/actions';

export default function LoginPage() {
    const [errorMessage, formAction, isPending] = useActionState(
        authenticate,
        undefined,
    );

    return (
        <div className="flex min-h-[60vh] items-center justify-center px-4">
            <div className="w-full max-max-w-md space-y-6 rounded-lg border p-6 shadow-md bg-white">
                <h1 className="text-2xl font-bold text-center text-gray-800">
                    Iniciar Sesión - Obispado
                </h1>
                <p className="text-sm text-gray-600 text-center">
                    Ingresa tus credenciales para administrar las reuniones sacramentales.
                </p>

                <form action={formAction} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Correo Electrónico
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="admin@church.org"
                            required
                            className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            name="password"
                            placeholder="••••••••"
                            required
                            className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:outline-none"
                        />
                    </div>

                    {errorMessage && (
                        <p className="text-sm text-red-600 font-medium text-center">
                            {errorMessage}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-full rounded-md bg-blue-600 px-4 py-2 text-white font-medium hover:bg-blue-700 transition disabled:opacity-50"
                    >
                        {isPending ? 'Ingresando...' : 'Iniciar Sesión'}
                    </button>
                </form>
            </div>
        </div>
    );
}