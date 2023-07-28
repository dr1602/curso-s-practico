import React, { useState } from 'react';
import { IDL } from '../public/solana_movies';
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js'
import { Program, Provider, web3 } from '@project-serum/anchor';
import { useRouter } from 'next/router';

export default function AddMovie() {

    const router = useRouter();
    const [inputMovieValue, setInputMovieValue] = useState('');
    const programID = new PublicKey(IDL.metadata.address);

    const {SystemProgram, Keypair} = web3;
    const network = clusterApiUrl('devnet');

    const opts = {
        preflightCommitment: 'processed',
        // para no bloquear tanto la UI, porque existen varios estados
    }

    const getProvider = () => {
        const connection = new Connection(network, opts.preflightCommitment);
        const provider = new Provider(
            // se necesita un provedor json rpc para poder conectar con Solana
            connection,
            window.solana,
            opts.preflightCommitment
        );

        return provider;

    };

    const stringToBytes = (input) => {
        return new TextEncoder().encode(input);
        // para crear el pda desde aqui y transformarlo a bytes
    }

    const addMovie = async () => {
        if (inputMovieValue.length > 0) {
            console.log('Movie Link: ', inputMovieValue);
            //la url que mandemos tiene que ser menor a 32 bytes, puede ser un limitante e importante a considerar

            var provider = getProvider();
            var program = new Program(IDL, programID, Provider);
            const [pda] = await PublicKey.findProgramAddress(
                [
                    stringToBytes('gif_account'),
                    provider.wallet.publicKey.toBytes(),
                    stringToBytes(inputMovieValue),
                ],
                program.programId
                // reutilizamos el codigo de prueba
            );

            await program.rpc.initialize(inputMovieValue, {
                accounts: {
                    movieGif: pda,
                    user: provider.wallet.publicKey,
                    systemProgram: SystemProgram.programId,
                },
            });

            setInputMovieValue('');
            router.push('/');
        } else {
            console.log('Empty input. Try again.');
        }
    }

    return(
        <div className='flex justify-center'>
            <div className='w-1/2 flex flex-col pb-[3vh]'>
                <input
                    placeholder='URL Movie'
                    className='mt-[3vh] border rounded p-[3vh]'
                    onChange={(e) => setInputMovieValue(e.target.value)}
                />
                <button
                    onClick={addMovie}
                    className='font-bold mt-[3vh] bg-b;ue-500 text-white rounded p-[3vh] shadow-lg'
                >
                    Add Movie
                </button>
            </div>    
        </div>
    );

}