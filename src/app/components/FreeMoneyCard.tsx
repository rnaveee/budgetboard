type FreeMoneyCardProps = {
  leftoverMoney: number;
};

export default function FreeMoneyCard({ leftoverMoney }: FreeMoneyCardProps){

  return (
        <div className="card w-full max-w-xl bg-white shadow-lg border border-green-200 py-5 px-3">
            <div className="card-body flex-row items-center justify-between gap-4">
                <div>
                    <h2 className="card-title text-3xl">Leftover Money</h2>
                    <p className="text-xl">Money after budgeting</p>
                </div>
                <h1 className="text-4xl font-bold text-green-700">
                  ${leftoverMoney.toFixed(2)}
                </h1>
            </div>
        </div>
    )
}
