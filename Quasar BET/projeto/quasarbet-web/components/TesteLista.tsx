import { Teste } from "@/types/teste";

type Props = {
   dados: Teste[];
};

export default function TesteLista({ dados }: Props) {
    return (
        <>
        {dados.map((item) => (
            <div key={item.id}>
            <p><strong>ID:</strong> {item.id}</p>
            <p><strong>Descrição:</strong> {item.descricao}</p>
            <p><strong>Data:</strong> {item.data}</p>
            <br />
            </div>
        ))}
        </>
    );
}