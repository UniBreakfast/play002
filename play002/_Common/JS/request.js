'use strict'

function request(type, url, cb, reportcb, falldata, fallcb, simonly, rawphp) {
  if (simonly) falldata? fallcb(falldata) : fallcb()
  else {
    const xhr = new XMLHttpRequest()
    xhr.open(type, url)
    xhr.timeout = 30000
    xhr.ontimeout = () => reportcb? reportcb(`${type} ${url} timed out`) :0
    xhr.onerror   =  e => reportcb? reportcb(`${type} ${url} produced ${e}`) :0
    xhr.onload    = () => {
      if (fallcb) falldata ? fallcb(falldata) : fallcb()
      else if (cb) {
        if (xhr.status >= 200 && xhr.status < 400) {
          if (!xhr.response.startsWith('<?php') || rawphp) {
            if (xhr.response !== '') cb(xhr.response)
            else cb() ||
              reportcb? reportcb(`${type} ${url} response was empty`) :0
          }
          else if (reportcb && !rawphp) {
            reportcb(`${type} ${url} php-code returned instead of response`)
            if (falldata) cb(falldata)
          }
        }
        else {
          if (reportcb) reportcb(`${type} ${url} request.status is ${xhr.status
                                 } ${xhr.statusText}`)
          falldata? cb(falldata) : cb()
        }
      }
    }
    xhr.send()
  }
}
