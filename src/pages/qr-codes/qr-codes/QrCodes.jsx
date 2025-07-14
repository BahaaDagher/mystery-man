import React from 'react'
import QrCodesCart from './QrCodesCart'

const ApiData = [
  {
    name: 'Branch Name 1',
    responses: 223,
    address: 'King Khalid Rd, Al Sanaiyyah, Al Duwadimi 17436, Saudi Arabia',
  },
  {
    name: 'Branch Name 2',
    responses: 98,
    address: 'King Khalid Rd, Al Sanaiyyah, Al Duwadimi 17436, Saudi Arabia',
  },
  {
    name: 'Branch Name 3',
    responses: 55,
    address: 'King Khalid Rd, Al Sanaiyyah, Al Duwadimi 17436, Saudi Arabia',
  },
  {
    name: 'Branch Name 1',
    responses: 223,
    address: 'King Khalid Rd, Al Sanaiyyah, Al Duwadimi 17436, Saudi Arabia',
  },
  {
    name: 'Branch Name 2',
    responses: 98,
    address: 'King Khalid Rd, Al Sanaiyyah, Al Duwadimi 17436, Saudi Arabia',
  },
  {
    name: 'Branch Name 3',
    responses: 55,
    address: 'King Khalid Rd, Al Sanaiyyah, Al Duwadimi 17436, Saudi Arabia',
  },
  {
    name: 'Branch Name 3',
    responses: 55,
    address: 'King Khalid Rd, Al Sanaiyyah, Al Duwadimi 17436, Saudi Arabia',
  },
]

const QrCodes = () => {
  return (
    <div className="flex flex-wrap gap-4 w-full">
      {ApiData.map((item, idx) => (
        <div key={idx} className="w-full lg:w-[49%]">
          <QrCodesCart
            branchName={item.name}
            responseCount={item.responses}
            address={item.address}
          />
        </div>
      ))}
    </div>
  )
}

export default QrCodes