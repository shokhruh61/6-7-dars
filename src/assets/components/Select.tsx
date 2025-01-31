import { FC, useEffect, useState } from 'react'
import currensy from '../currency.json'
import reactLogo from '../react.svg'
interface CurrencyType {
  Flag?: string
  CountryName: string
  Currency: string
  Code: string
  Rate: number
}

const Select: FC = () => {
  const [open, setOpen] = useState(false)
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyType | null>(
    null
  )
  const [usdAmount, setUsdAmount] = useState<number | null>(null)
  const [convertedValue, setConvertedValue] = useState<number | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  const currentUsd = currensy.find(currency => currency.Code === 'USD')

  useEffect(() => {
    if (!selectedCurrency) {
      setSelectedCurrency(currensy[235])
    }
  }, [selectedCurrency])

  const handleSelectCurrency = (currency: CurrencyType) => {
    setSelectedCurrency(currency)
    setOpen(false)
  }

  const handleConvert = () => {
    if (currentUsd && selectedCurrency && usdAmount) {
      const converted = (usdAmount * selectedCurrency.Rate) / currentUsd.Rate
      setConvertedValue(converted)
    }
  }

  const filteredCurrencies = currensy.filter(
    currency =>
      currency.CountryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      currency.Code.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className='w-[900px] mx-auto border-2 border-blue-500 p-6 rounded-xl mt-20 shadow-lg bg-white'>
      <div className='mb-5'>
        <label className='block mb-2 text-lg font-semibold'>
          Enter Amount in USD:
        </label>
        <input
          type='number'
          value={usdAmount || ''}
          onChange={e => setUsdAmount(Number(e.target.value))}
          className='w-full p-3 border-2 border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300'
          placeholder='Amount in USD'
        />
      </div>

      <div
        className={`relative border-2 p-3 rounded-lg cursor-pointer ${
          open ? 'border-blue-500' : 'border-gray-300'
        }`}
        onClick={() => setOpen(!open)}
      >
        <label className='text-sm text-gray-600'>Select Currency</label>
        <div className='flex justify-between items-center mt-2'>
          <div className='flex items-center gap-3'>
            {selectedCurrency?.Flag && (
              <img
                className='w-[25px] h-[25px] rounded-br-sm'
                src={selectedCurrency.Flag}
                alt={selectedCurrency.CountryName}
              />
            )}
            <p>{`${selectedCurrency?.Code} - ${selectedCurrency?.Currency} (${selectedCurrency?.CountryName})`}</p>
          </div>
        </div>

        {open && (
          <>
            <input
              type='search'
              placeholder='Search'
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              onClick={e => e.stopPropagation()}
              className='w-full h-[40px] p-3 focus:outline-none focus:ring-2 focus:ring-blue-300 border-b border-gray-300 mt-3'
            />
            <ul className='absolute w-full bg-white z-10 mt-1 border rounded-md max-h-48 overflow-y-auto shadow-md'>
              {filteredCurrencies.map((currency, index) => (
                <li
                  key={index}
                  className='flex items-center gap-3 p-3 hover:bg-blue-100 cursor-pointer rounded-md transition-all'
                  onClick={() => handleSelectCurrency(currency)}
                >
                  {currency.Flag && (
                    <img
                      className='w-6 h-6 rounded-full'
                      src={currency.Flag}
                      alt={currency.CountryName}
                    />
                  )}
                  <p>{`${currency.Code} - ${currency.Currency} (${currency.CountryName})`}</p>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      <button
        onClick={handleConvert}
        className='w-full bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-all duration-200 ease-in-out mt-5 shadow-lg'
      >
        Convert
      </button>

      {convertedValue !== null && (
        <p className='mt-5 text-center text-lg font-medium'>
          Converted Value: <strong>{convertedValue.toLocaleString()}</strong>{' '}
          {selectedCurrency?.Code}
        </p>
      )}
    </div>
  )
}

export default Select
