import 'reflect-metadata';

import 'dotenv/config';
import './database';

import express from 'express';
import cors from 'cors';
import Youch from 'youch';
import helmet from 'helmet';
import routes from './routes/index';

class App {

    public server: any;

    //inicializa os metodos inicias
    constructor() {
        this.server = express();
        this.middlewares();
        this.routes();
        this.exceptionHandler()
    }

    /**
     * Metodo que retorna a rota
     */
    private routes(): void {
        this.server.use(routes);
    }

    /**
     * Metodo que carregas as configurações de segurança e cors
     */
    private middlewares(): void {
        this.server.use(cors());
        this.server.use(helmet());
        this.server.use(express.json());
    }

    private exceptionHandler(): void {
        this.server.use( async (error: any, request: any, response: any, next: any) => {
            if(process.env.NODE_ENV === 'development') {
                const err = await new Youch(error, request).toJSON();
                return response.status(500).json(err)
            }

            return response.status(500).json({
                error: 'Internal server error :(',
            });
        });
    }

}

export default new App().server;